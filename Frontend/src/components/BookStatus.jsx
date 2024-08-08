import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

const BookStatus = () => {
  const [data, setData] = useState([
    { name: "John", email: "john@example.com", age: 25 },
    { name: "Jane", email: "jane@example.com", age: 30 },
    { name: "Bob", email: "bob@example.com", age: 35 },
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        muiTableBodyCellEditTextFieldProps: {
          type: "email",
          variant: "standard",
        },
      },
      {
        accessorKey: "age",
        header: "Age",
        muiTableBodyCellEditTextFieldProps: {
          type: "number",
          variant: "standard",
        },
      },
      {
        id: "actions",
        header: "Actions",
        Cell: ({ row, table }) => (
          <Box>
            <IconButton
              onClick={() => {
                table.setEditingRow(row);
              }}
            >
              <EditIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                setData((prev) =>
                  prev.filter((_, index) => index !== row.index)
                );
              }}
            >
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
    setData((prev) =>
      prev.map((item, index) => (index === row.index ? values : item))
    );
    exitEditingMode();
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      editDisplayMode="modal"
      onEditingRowSave={handleSaveRow}
    />
  );
};

const tablePropType = PropTypes.shape({
  setEditingRow: PropTypes.func.isRequired,
});

const rowPropType = PropTypes.shape({
  index: PropTypes.number.isRequired,
  original: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
});

BookStatus.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    })
  ),
  table: tablePropType.isRequired,
  row: rowPropType.isRequired,
};

export default BookStatus;
