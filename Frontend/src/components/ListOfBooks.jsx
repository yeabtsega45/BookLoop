import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, CircularProgress, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ListOfBooks() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  //get all books
  useEffect(() => {
    setLoading(true);
    axios
      .get("/book/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // Transform the data to match your table structure
          console.log(res.data);
          const transformedData = res.data
            .slice()
            .reverse()
            .map((book, index) => ({
              no: index + 1,
              author: book.author || "Not provided",
              owner: book.currentOwner?.email || "No owner",
              category: book.category || "Not provided",
              bookName: book.title || "Not provided",
              status: book.currentOwner?.status || "Inactive",
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

  // Switch Status state
  const handleStatusToggle = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = {
        ...newData[index],
        status: newData[index].status === "Active" ? "Inactive" : "Active",
      };
      return newData;
    });
  };

  // Extract Name from Email
  const extractNameFromEmail = (email) => {
    if (!email || email === "No owner") return email;
    // Split name before @ symbol
    const name = email.split("@")[0];
    // Change first letter to capital
    return name.charAt(0).toUpperCase() + name.slice(1);
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
        accessorKey: "author",
        header: "Author",
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
        accessorKey: "owner",
        header: "Owner",
        // Display avatar & owner name on owner column
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon sx={{ color: "grey" }} />
            <Typography sx={{ ml: 1 }}>
              {extractNameFromEmail(row.original.owner)}
            </Typography>
          </Box>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
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
              checked={row.original.status === "Active"}
              onChange={() => handleStatusToggle(row.index)}
              color={row.original.status === "Active" ? "success" : "default"}
            />
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
        className="!pt-[74px]"
      >
        List of Books
      </Typography>
    );
  };

  const table = useMaterialReactTable({
    columns,
    data,
    editDisplayMode: "modal", // modal display
    onEditingRowSave: handleSaveRow, // editing modal onClick
    muiTableProps: { sx: { width: "100%", height: "90%", padding: "20px" } }, // Table styling
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

    muiTablePaperProps: {
      sx: {
        width: "1143px",
        my: "20px",
        borderRadius: "20px",
      },
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

  return <MaterialReactTable table={table} />;
}

ListOfBooks.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      bookName: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ),
  row: PropTypes.object.isRequired,
  "row.index": PropTypes.number.isRequired,
  "row.original": PropTypes.object.isRequired,
  "row.original.status": PropTypes.string.isRequired,
  table: PropTypes.object.isRequired,
  "table.setEditingRow": PropTypes.func.isRequired,
};

export default ListOfBooks;
