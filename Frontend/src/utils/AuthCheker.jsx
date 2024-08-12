import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/register");
        return;
      }

      // Make a request to your backend to verify the token
      axios
        .get("/api/verify-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            // Token is valid, user is authenticated
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          navigate("/register");
        });
    };

    checkAuth();
  }, [navigate]);

  return children;
};

export default AuthChecker;
