import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/system";
import PropTypes from "prop-types";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
});

const CustomPaper = (props) => {
  const theme = useTheme();

  return (
    <Paper elevation={8} style={{ padding: theme.spacing(2) }}>
      {props.children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button color="primary" variant="text" onClick={props.handleOpenModal}>
          Add
        </Button>
      </Box>
    </Paper>
  );
};

CustomPaper.propTypes = {
  children: PropTypes.node,
  handleOpenModal: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function SearchBook() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "Book 1", author: "F. Scott Fitzgerald" },
    { id: 2, title: "Book 2", author: "Harper Lee" },
  ]);
  const [open, setOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");

  const handleOpenModal = () => {
    setOpen(true);
    console.log("Modal should open now");
  };
  const handleCloseModal = () => setOpen(false);

  const handleAddBook = () => {
    const newBook = {
      id: books.length + 1,
      title: newBookTitle,
      author: newBookAuthor,
    };
    setBooks([...books, newBook]);
    setNewBookTitle("");
    setNewBookAuthor("");
    handleCloseModal();
  };

  return (
    <Box width="100%" maxWidth={360}>
      <StyledAutocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="select-demo"
        options={books}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search book by name or Author"
            placeholder="Search..."
            variant="outlined"
            sx={{ backgroundColor: "#0000000F" }}
          />
        )}
        PaperComponent={(props) => (
          <CustomPaper
            {...props}
            inputValue={inputValue}
            handleOpenModal={handleOpenModal}
          />
        )}
        fullWidth
      />

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Book
          </Typography>
          <TextField
            fullWidth
            label="Book Title"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            value={newBookAuthor}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddBook} sx={{ mt: 2 }}>
            Add Book
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default SearchBook;
