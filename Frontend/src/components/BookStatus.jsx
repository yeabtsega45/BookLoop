import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton, Radio, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

const BookStatus = () => {
  const [data, setData] = useState([
    {
      no: 1,
      bookNo: 6465,
      bookName: "Derto Gada",
      status: "Rented",
      price: 25,
    },
    {
      no: 2,
      bookNo: 6465,
      bookName: "Derto Gada",
      status: "Rented",
      price: 30,
    },
    {
      no: 3,
      bookNo: 6465,
      bookName: "Derto Gada",
      status: "Rented",
      price: 35,
    },
    {
      no: 4,
      bookNo: 6465,
      bookName: "Fikr Eske Mekabr",
      status: "Free",
      price: 25,
    },
    {
      no: 5,
      bookNo: 6465,
      bookName: "Fikr Eske Mekabr",
      status: "Free",
      price: 30,
    },
    {
      no: 6,
      bookNo: 6465,
      bookName: "Fikr Eske Mekabr",
      status: "Free",
      price: 35,
    },
  ]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "no",
        header: "No",
        muiTableBodyCellEditTextFieldProps: {
          type: "number",
          variant: "standard",
        },
      },
      {
        accessorKey: "bookNo",
        header: "Book no",
        muiTableBodyCellEditTextFieldProps: {
          type: "number",
          variant: "standard",
        },
      },
      {
        accessorKey: "bookName",
        header: "Book Name",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Radio
              color={row.original.status === "Rented" ? "error" : "primary"}
              checked={true}
            />
            <Typography>{row.original.status}</Typography>
          </Box>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
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

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: "modal",
    onEditingRowSave: handleSaveRow,
    muiTableProps: { sx: { px: "28px" } },
  });

  return <MaterialReactTable table={table} />;
};

BookStatus.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      bookNo: PropTypes.number.isRequired,
      bookName: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
  row: PropTypes.object.isRequired,
  "row.index": PropTypes.number.isRequired,
  "row.original": PropTypes.object.isRequired,
  "row.original.status": PropTypes.string.isRequired,
  table: PropTypes.object.isRequired,
  "table.setEditingRow": PropTypes.func.isRequired,
};

export default BookStatus;
