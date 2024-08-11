import group1white from "@/assets/Group 1 white.png";
import group1 from "@/assets/Group 1.png";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  return (
    <div className="flex h-screen w-full">
      <div className="bg-secondary h-full w-[50%] flex justify-center items-center">
        <img src={group1white} alt="group1white" />
      </div>
      <form
        className="bg-white h-full w-[50%] flex flex-col justify-center px-20"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center pb-10">
          <img src={group1} alt="group1" />
          <h2 className="text-3xl pl-2">Book Rent</h2>
        </div>
        <h3 className="text-2xl pb-2">Login</h3>
        <hr className="pb-6" />
        <TextField
          id="outlined-basic"
          label="Email address"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Login
        </Button>
        <p className="text-center">
          Have not an account?
          <span className="text-primary pl-1 hover:cursor-pointer">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
