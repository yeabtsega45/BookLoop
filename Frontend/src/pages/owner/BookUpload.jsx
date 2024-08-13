import Header from "@/components/Header";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchBook from "../../components/SearchBook";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography } from "@mui/material";
import smile from "@/assets/smile 1.png";

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  justifyContents: "center",
  alignItems: "center",
};

function BookUpload() {
  const [data, setData] = useState({
    title: "",
    author: "",
    category: "",
    quantity: "",
    price: "",
    image: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = (event) => {
    event.preventDefault();

    setOpenModal(true);
    setModalMessage("Submitting book data...");

    const formdata = new FormData();
    for (const key in data) {
      formdata.append(key, data[key]);
    }

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
        setModalMessage("Book uploaded successfully!");
        console.log(res);
        setTimeout(() => {
          setOpenModal(false);
          navigate("/bookupload");
        }, 2000);
      })
      .catch((err) => {
        setModalMessage("Error uploading book. Please try again.");
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        <SearchBook setParentData={setData} />
        <div className="flex justify-between w-[60%] mt-6 mb-5">
          <select
            className="w-[320px] text-[#656575] px-4 py-3 border border-[#DEDEDE] rounded-lg"
            onChange={(e) => {
              setData({ ...data, quantity: e.target.value });
            }}
            value={data.quantity}
          >
            <option value="">Book Quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <input
            type="text"
            placeholder="Rent price for 2 weeks"
            onChange={(e) => {
              setData({ ...data, price: e.target.value });
            }}
            value={data.price}
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
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
          />
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ py: 3, px: 16, borderRadius: "20px" }}
        >
          Submit
        </Button>
      </form>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <img src={smile} alt="smile" />
          <Typography
            id="modal-modal-title"
            sx={{ fontSize: "18px", fontWeight: 600, mt: "10px" }}
          >
            Congrats!
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              color: "#00000080",
              fontSize: "12px",
              mt: "10px",
              mb: "25px",
            }}
          >
            {modalMessage}
          </Typography>
          <Button variant="contained" onClick={handleCloseModal}>
            Ok
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default BookUpload;
