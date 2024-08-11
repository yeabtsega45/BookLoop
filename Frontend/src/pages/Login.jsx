import group1white from "@/assets/Group 1 white.png";
import group1 from "@/assets/Group 1.png";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        <p className="text-red-600 font-semibold">{error}</p>
        <h3 className="text-2xl pb-2">Login</h3>
        <hr className="pb-6" />
        <TextField
          id="outlined-basic"
          label="Email address"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          sx={{ mb: 2 }}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mb: 2 }}
        >
          Login
        </Button>
        <p className="text-center">
          Have not an account?
          <Link
            to="/register"
            className="text-primary pl-1 hover:cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
