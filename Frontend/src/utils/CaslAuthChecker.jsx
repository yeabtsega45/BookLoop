import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import defineAbilitiesFor from "@/utils/defineAbilitiesFor";
import CircularProgress from "@mui/material/CircularProgress";

const CaslAuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        location.pathname === "/login/admin"
      ) {
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
            const user = response.data.user;
            const ability = defineAbilitiesFor(user.role);

            if (ability.can("manage", "all")) {
              // Admin user
              if (
                location.pathname === "/login" ||
                location.pathname === "/register" ||
                location.pathname === "/login/admin"
              ) {
                navigate("/admin");
              }
              // Allow admin to access all routes
            } else {
              // Non-admin user
              if (location.pathname.startsWith("/admin")) {
                navigate("/"); // Redirect non-admin users trying to access admin routes
              }
            }
            setIsChecking(false);
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
    return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <CircularProgress />
        <p className="text-gray-500 mt-6">
          Please wait a moment...This might be a result of the backend being
          deployed on Render free plan.
        </p>
      </div>
    );
  }

  return children;
};

CaslAuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaslAuthChecker;
