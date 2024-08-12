import Header from "@/components/Header";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import SearchBook from "../../components/SearchBook";

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
  return (
    <div className="flex flex-col justify-between items-center w-full h-full m-auto pt-4">
      <Header role="Owner" page="Book Upload" />
      <div className="bg-primary-contrast flex flex-col justify-center items-center w-[1146px] h-[91.1%] m-auto mt-5 pb-72 rounded-2xl">
        <h1 className="text-[#525256] text-[22px] font-medium mt-12 mb-7">
          Upload new Book
        </h1>
        <SearchBook />
        <div className="flex justify-between w-[55%] mt-6 mb-5">
          <select className="w-[320px] text-[#656575] px-4 py-3 border border-[#DEDEDE] rounded-lg">
            <option className="">Book Quantity</option>
            <option className="">1</option>
            <option className="">2</option>
            <option className="">3</option>
          </select>
          <input
            type="text"
            placeholder="Rent price for 2 weeks"
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
          sx={{ py: 3, px: 16, borderRadius: "20px" }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default BookUpload;
