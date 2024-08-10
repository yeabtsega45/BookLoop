import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import { styled } from "@mui/system";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
});

export default function SearchBook() {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" },
  ]);

  const handleAddBook = () => {
    const newBook = {
      id: books.length + 1,
      title: inputValue,
      author: "Unknown",
    };
    setBooks([...books, newBook]);
    setInputValue("");
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
        getOptionLabel={(option) => option.title} // How titles are read for display
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Books"
            placeholder="Type or select a book"
            variant="outlined"
            sx={{ backgroundColor: "#0000000F" }}
          />
        )}
        ListboxProps={{
          renderFooter: () => (
            <ListSubheader component="div" style={{ textAlign: "center" }}>
              <Button onClick={handleAddBook} color="primary" size="small">
                Add {inputValue}
              </Button>
            </ListSubheader>
          ),
        }}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            {option.title} - {option.author}
          </li>
        )}
        freeSolo
        fullWidth
      />
    </Box>
  );
}
