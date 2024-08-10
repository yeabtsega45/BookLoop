import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Menu from "@mui/material/Menu";

const StyledTextField = styled(TextField)({
  margin: "10px 15px",
});

export default function SearchBook() {
  const [value, setValue] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [options, setOptions] = React.useState([10, 20, 30]);
  const [open, setOpen] = React.useState(false); // Control dropdown state

  const handleChange = (event) => {
    setValue(event.target.value);
    setSearchTerm(""); // Clear search term on selection
    setOpen(false); // Close dropdown after selection
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setOpen(true); // Keep dropdown open during search
  };

  const handleClick = () => {
    setOpen(true); // Open dropdown when clicking inside the input field
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
        open={open} // Control whether the dropdown is open
        onClose={() => setOpen(false)} // Close the dropdown
        onOpen={() => setOpen(true)} // Open the dropdown
        MenuProps={{ disableAutoFocusItem: true }} // Prevent auto focus on items
        renderValue={value !== "" ? undefined : () => "Select an option"}
      >
        <MenuItem disableRipple>
          <StyledTextField
            placeholder="Search..."
            variant="standard"
            onChange={handleSearch}
            onClick={handleClick} // Keep dropdown open when clicking inside input
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
