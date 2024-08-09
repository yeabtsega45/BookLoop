import Header from "@/components/Header";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

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
    <div className="flex flex-col justify-between items-center w-[77.8%] h-[95.8%] m-auto pt-4">
      <Header role="Owner" page="Book Upload" />
      <div className="bg-primary-contrast flex flex-col justify-center items-center w-full h-[91.1%] m-auto mt-5 rounded-2xl">
        <h1 className="text-[#525256] text-[22px] font-medium">
          Upload new Book
        </h1>
        <div className="flex">
          <select className="text-[#656575] px-4 py-3 border border-[#DEDEDE] rounded-lg">
            <option className="">Book Quantity</option>
            <option className="">1</option>
            <option className="">2</option>
            <option className="">3</option>
          </select>
          <input
            type="text"
            placeholder="Rent price for 2 weeks"
            className="px-2 py-3 border border-[#DEDEDE] rounded-lg"
          />
        </div>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<FileUploadOutlinedIcon />}
        >
          Upload Book Cover
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
    </div>
  );
}

export default BookUpload;
