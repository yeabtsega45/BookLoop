import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/system";
import PropTypes from "prop-types";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
});

const CustomPaper = (props) => {
  // Use MUI useTheme hook to access the theme for consistent styling
  const theme = useTheme();

  return (
    <Paper elevation={8} {...props}>
      {props.children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          padding: theme.spacing(1),
        }}
      >
        <Button color="primary" variant="text" onClick={props.handleAdd}>
          Add {props.inputValue}
        </Button>
      </Box>
    </Paper>
  );
};

CustomPaper.propTypes = {
  children: PropTypes.node,
  handleAdd: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};

function SearchBook() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "Book 1", author: "F. Scott Fitzgerald" },
    { id: 2, title: "Book 2", author: "Harper Lee" },
  ]);

  const handleAddBook = () => {
    const newBook = {
      id: books.length + 1,
      title: inputValue,
      author: "Unknown",
    };
    setBooks([...books, newBook]);
    setInputValue(""); // Optionally clear input after adding
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
        getOptionLabel={(option) => option.title} // Specify how to read the title for display
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
            handleAdd={handleAddBook}
          />
        )}
        fullWidth
      />
    </Box>
  );
}

export default SearchBook;
