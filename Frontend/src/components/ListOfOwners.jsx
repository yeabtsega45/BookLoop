import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import DoneIcon from "@mui/icons-material/Done";

function ListOfOwners() {
  const [data, setData] = useState([
    {
      no: 1,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Active",
    },
    {
      no: 2,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Active",
    },
    {
      no: 3,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Active",
    },
    {
      no: 4,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Active",
    },
    {
      no: 5,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Active",
    },
    {
      no: 6,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Active",
    },
    {
      no: 7,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Inactive",
    },
    {
      no: 8,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Inactive",
    },
    {
      no: 9,
      owner: "Nardos T",
      upload: "15 Books",
      location: "Addis Ababa",
      status: "Inactive",
    },
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "no", // value of data
        header: "No", // table header display
        muiTableBodyCellEditTextFieldProps: {
          type: "number", // data type
          variant: "standard",
        },
      },
      {
        accessorKey: "owner",
        header: "Owner",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
      },
      {
        accessorKey: "upload",
        header: "Upload",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        // Display switch on status column
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: row.original.status === "Active" ? "#008000" : "default",
              backgroundColor: "#0080001A",
              px: "15px",
              borderRadius: "16px",
            }}
          >
            <DoneIcon />
            <Typography>{row.original.status}</Typography>
            <Switch
              defaultChecked
              color={row.original.status === "Active" ? "success" : "default"}
            />
          </Box>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
      },
      {
        id: "actions",
        header: "Actions",
        // Display view & delete icons on actions column
        Cell: ({ row, table }) => (
          <Box>
            <IconButton
              onClick={() => {
                table.setEditingRow(row);
              }}
            >
              <VisibilityIcon sx={{ color: "black" }} />
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

  // Function to set the state to edited data
  const handleSaveRow = ({ exitEditingMode, row, values }) => {
    setData((prev) =>
      prev.map((item, index) => (index === row.index ? values : item))
    );
    exitEditingMode();
  };

  // Title displayed on the top of the table
  const renderTopToolbarCustomActions = () => {
    return (
      <Typography
        variant="h6"
        style={{ padding: "12px 28px", fontWeight: 600 }}
      >
        List of Owners
      </Typography>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: "modal", // modal display
    onEditingRowSave: handleSaveRow, // editing modal onClick
    muiTableProps: { sx: { width: "100%" } }, // Table styling
    renderTopToolbarCustomActions, // Add title on top of the table
    positionToolbarAlertBanner: "bottom", // Add title on top of the table
    enableColumnActions: false, // Remove header options
    enableSorting: false, // Remove header options
  });

  return (
    <div className="bg-primary-contrast flex flex-col justify-center items-center w-full h-[91.1%] m-auto mt-5 rounded-2xl">
      <MaterialReactTable table={table} />
    </div>
  );
}

ListOfOwners.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      owner: PropTypes.string.isRequired,
      upload: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ),
  row: PropTypes.object.isRequired,
  "row.index": PropTypes.number.isRequired,
  "row.original": PropTypes.object.isRequired,
  "row.original.status": PropTypes.string.isRequired,
  table: PropTypes.object.isRequired,
  "table.setEditingRow": PropTypes.func.isRequired,
};

export default ListOfOwners;
