import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  margin: "10px 15px",
});

export default function SearchBook() {
  const [value, selectValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [options, setOptions] = React.useState([10, 20, 30]);
  console.log(setOptions);

  const handleChange = (event) => {
    selectValue(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormControl size="medium" variant="filled" fullWidth>
      <InputLabel id="select-label">Label</InputLabel>
      <Select
        labelId="select-label"
        id="select-demo"
        value={value}
        label="Label"
        onChange={handleChange}
        displayEmpty
        renderValue={value !== "" ? undefined : () => "Select an option"}
      >
        <MenuItem disabled>
          <StyledTextField
            placeholder="Search..."
            variant="standard"
            onChange={handleSearch}
            value={searchTerm}
            fullWidth
            autoFocus
          />
        </MenuItem>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option === 10 ? "Ten" : option === 20 ? "Twenty" : "Thirty"}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No options found</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
