import group1white from "../assets/Group 1 white.png";
import group1 from "../assets/Group 1.png";

function Login() {
  return (
    <div className="flex h-screen w-full">
      <div className="bg-[#171B36] h-full w-[50%] flex justify-center items-center">
        <img
          src={group1white}
          alt="group1white"
          // className="h-full w-full object-contain"
        />
      </div>
      <div className="bg-white h-full w-[50%] flex justify-center items-center">
        <img src={group1} alt="group1" />
        <h2>Book Rent</h2>
      </div>
    </div>
  );
}

export default Login;
