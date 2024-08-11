import group1white from "@/assets/Group 1 white.png";
import group1 from "@/assets/Group 1.png";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-secondary h-full w-[50%] flex justify-center items-center">
        <img src={group1white} alt="group1white" />
      </div>
      <div className="bg-white h-full w-[50%] flex flex-col justify-center px-20">
        <div className="flex items-center pb-10">
          <img src={group1} alt="group1" />
          <h2 className="text-3xl pl-2">Book Rent</h2>
        </div>
        <h3 className="text-2xl pb-2">Signup as Owner</h3>
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
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="I accept the Terms and Conditions"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Sign up
        </Button>
        <p className="text-center">
          Already have an account
          <span className="text-primary pl-1 hover:cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
