import group1white from "@/assets/Group 1 white.png";
import group1 from "@/assets/Group 1.png";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

function Login() {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-secondary h-full w-[50%] flex justify-center items-center">
        <img
          src={group1white}
          alt="group1white"
          // className="h-full w-full object-contain"
        />
      </div>
      <div className="bg-white h-full w-[50%] flex flex-col justify-center px-20">
        <div className="flex items-center pb-10">
          <img src={group1} alt="group1" />
          <h2 className="text-2xl pl-2">Book Rent</h2>
        </div>
        <h3 className="text-xl pb-2">Login</h3>
        <hr />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <FormControlLabel control={<Checkbox />} label="Label" sx={{ mb: 2 }} />
        <Button variant="contained" sx={{ mb: 2 }}>
          Contained
        </Button>
        <p className="text-center">
          Haven not an account?
          <span className="text-primary pl-1">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
