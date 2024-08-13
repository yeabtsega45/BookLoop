import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // If we're already on the login or register page, don't redirect
      if (location.pathname === "/login" || location.pathname === "/register") {
        setIsChecking(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        // No token, check if user exists
        axios
          .post("/auth/checkuser", {
            email: localStorage.getItem("userEmail"),
          })
          .then((response) => {
            if (response.status === 200) {
              // User exists, redirect to login
              navigate("/login");
            } else {
              // User doesn't exist, redirect to register
              navigate("/register");
            }
          })
          .catch((error) => {
            console.error("Error checking user:", error);
            navigate("/register");
          })
          .finally(() => {
            setIsChecking(false);
          });
      } else {
        // Verify token
        axios
          .get("/auth/verifytoken", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              // Token is valid, user is authenticated
              if (location.pathname === "/") {
                setIsChecking(false);
              } else {
                navigate("/");
              }
            } else {
              // Token is invalid or expired
              localStorage.removeItem("token");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.error("Error verifying token:", error);
            localStorage.removeItem("token");
            navigate("/login");
          })
          .finally(() => {
            setIsChecking(false);
          });
      }
    };

    checkAuth();
  }, [navigate, location]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return children;
};

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthChecker;
