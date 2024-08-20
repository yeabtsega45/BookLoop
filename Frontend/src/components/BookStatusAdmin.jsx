import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, CircularProgress, Radio, Typography } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const BookStatusAdmin = () => {
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
              bookNo: book.bookNo,
              owner: book.currentOwner?.email || "No owner",
              status: book.status,
              price: book.price,
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

  // Changes Status
  const handleStatusChange = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].status =
        newData[index].status === "Free" ? "Rented" : "Free";
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
        accessorKey: "status",
        header: "Status",
        // Display Radio button on status column
        Cell: ({ row }) => (
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => handleStatusChange(row.index)}
          >
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
          },
        },
        size: 50,
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

BookStatusAdmin.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number.isRequired,
      bookNo: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ),
  row: PropTypes.object.isRequired,
  "row.index": PropTypes.number.isRequired,
  "row.original": PropTypes.object.isRequired,
  "row.original.status": PropTypes.string.isRequired,
  table: PropTypes.object.isRequired,
  "table.setEditingRow": PropTypes.func.isRequired,
};

export default BookStatusAdmin;
