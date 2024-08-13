import Header from "@/components/Header";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchBook from "../../components/SearchBook";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function BookUpload() {
  const [data, setData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("author", data.author);
    formdata.append("category", data.category);
    formdata.append("quantity", data.quantity);
    formdata.append("price", data.price);
    formdata.append("image", data.image);
    console.log(formdata);
    axios
      .request({
        method: "POST",
        url: "/book/create",
        data: formdata,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/bookupload");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-full m-auto pt-4">
      <Header role="Owner" page="Book Upload" />
      <form
        onSubmit={handleSubmit}
        className="bg-primary-contrast flex flex-col justify-center items-center w-[1146px] h-[804px] m-auto mt-5 mb-7 pb-72 rounded-2xl"
      >
        <h1 className="text-[#525256] text-[22px] font-medium mt-12 mb-7">
          Upload new Book
        </h1>
        <SearchBook />
        <div className="flex justify-between w-[60%] mt-6 mb-5">
          <select
            className="w-[320px] text-[#656575] px-4 py-3 border border-[#DEDEDE] rounded-lg"
            onChange={(e) => {
              setData({ ...data, quantity: e.target.value });
            }}
          >
            <option>Book Quantity</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <input
            type="text"
            placeholder="Rent price for 2 weeks"
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
            className="w-[320px] px-2 py-3 border border-[#DEDEDE] rounded-lg"
          />
        </div>
        <Button
          component="label"
          role={undefined}
          variant="text"
          tabIndex={-1}
          startIcon={<FileUploadOutlinedIcon />}
          sx={{
            mb: "30px",
            fontSize: "16px",
            fontWeight: 500,
            textTransform: "none",
          }}
        >
          Upload Book Cover
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ py: 3, px: 16, borderRadius: "20px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default BookUpload;
