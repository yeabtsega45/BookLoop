import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import defineAbilitiesFor from "@/utils/defineAbilitiesFor";

const CaslAuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        setIsChecking(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      } else {
        try {
          const response = await axios.get("/auth/verifytoken", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const userRole = response.data.role; // Assuming role comes in the response
            const ability = defineAbilitiesFor(userRole);

            if (ability.can("manage", "all")) {
              navigate("/admin");
            } else {
              setIsChecking(false);
            }
          } else {
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [navigate, location]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return children;
};

CaslAuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaslAuthChecker;
