import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  CircularProgress,
  IconButton,
  Radio,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import axios from "axios";

const BookStatus = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  //get user's books
  useEffect(() => {
    setLoading(true);
    axios
      .get("/book/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // Transform the data to match your table structure
          const transformedData = res.data.map((book, index) => ({
            no: index + 1,
            bookNo: book.bookNo,
            bookName: book.title,
            status: book.status,
            price: book.price,
            _id: book._id,
          }));
          setData(transformedData);
          setLoading(false);
        } else {
          setError("Error while fetching data.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Error while fetching data.");
        setLoading(false);
      });
  }, []);

  // delete book
  const handleDelete = (id) => {
    axios
      .delete("/book/delete/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setData((prevData) => prevData.filter((book) => book._id !== id));
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  // Edit book
  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    try {
      const id = row.original._id; // Get the id from the original row data
      const response = await axios.put(`/book/update/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setData((prev) =>
          prev.map((prevData) =>
            prevData._id === id ? { ...prevData, ...values } : prevData
          )
        );
        exitEditingMode();
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "no", // value of data
        header: "No", // table header display
        muiTableBodyCellEditTextFieldProps: {
          type: "number", // data type
          variant: "standard",
        },
        muiTableHeadCellProps: {
          sx: { width: "10px" },
        },
        muiTableBodyCellProps: {
          sx: { width: "20px", margin: "auto" },
        },
        size: 50,
      },
      {
        accessorKey: "bookNo",
        header: "Book no",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
        muiTableHeadCellProps: {
          sx: { width: "10px" },
        },
        muiTableBodyCellProps: {
          sx: { width: "20px" },
        },
        size: 100,
      },
      {
        accessorKey: "bookName",
        header: "Book Name",
        muiTableBodyCellEditTextFieldProps: {
          variant: "standard",
        },
        muiTableHeadCellProps: {
          sx: { width: "10px" },
        },
        muiTableBodyCellProps: {
          sx: { width: "20px" },
        },
        size: 180,
      },
      {
        accessorKey: "status",
        header: "Status",
        // Display Radio button on status column
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
          variant: "standard",
        },
        muiTableHeadCellProps: {
          sx: { width: "10px" },
        },
        muiTableBodyCellProps: {
          sx: {
            width: "20px",
            margin: "auto",
          },
        },
        size: 100,
      },
      {
        id: "actions",
        header: "Actions",
        // Display edit & delete icons on actions column
        Cell: ({ row, table }) => (
          <div className="!p-0 !m-0 ">
            <IconButton
              onClick={() => {
                table.setEditingRow(row);
              }}
            >
              <EditIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original._id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  // Title displayed on the top of the table
  const renderTopToolbarCustomActions = () => {
    return (
      <Typography
        variant="h6"
        style={{ padding: "12px 28px", fontWeight: 600 }}
        className="!pt-[74px]"
      >
        Live Book Status
      </Typography>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: "modal", // modal display
    onEditingRowSave: handleSaveRow, // editing modal onClick
    muiTableProps: { sx: { height: "90%", padding: "20px", width: "100%" } },
    renderTopToolbarCustomActions, // Add title on top of the table
    positionToolbarAlertBanner: "bottom", // Add title on top of the table
    enableColumnActions: false, // Remove header options
    enableSorting: false, // Remove header options
    muiTableBodyCellProps: {
      sx: {
        padding: "0", // Adjust padding here for table cells
      },
    },
    muiTableBodyRowProps: {
      sx: {
        width: "20px",
      },
    },
    // Table styling
    muiTablePaperProps: {
      sx: {
        width: "100%",
        borderRadius: "20px",
      },
    },
    // default message if there is no data on the table
    localization: {
      noRecordsToDisplay: "You have not uploaded books yet.",
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="bg-primary-contrast flex items-center w-full h-full rounded-2xl">
      <MaterialReactTable table={table} />
    </div>
  );
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
