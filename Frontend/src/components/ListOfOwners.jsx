import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

function ListOfOwners() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [openNotification, setOpenNotification] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  //get all books
  useEffect(() => {
    setLoading(true);
    axios
      .get("/auth/getall", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // Transform the data to match your table structure
          console.log(res.data);
          const transformedData = res.data.map((user, index) => ({
            no: index + 1,
            owner: user.email,
            upload: user.upload,
            status: user.status,
            location: user.location,
            _id: user._id,
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

  // delete user
  const handleDelete = (id) => {
    axios
      .delete("/auth/delete/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setData((prevData) => prevData.filter((user) => user._id !== id));
        } else {
          alert("Error");
        }
      })
      .catch((err) => {
        console.log(err);
        setOpenNotification(true);
        setDeleteError(err.response?.data?.message);
      });
  };

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

  // Eye icon on click
  const handleViewDetails = (row) => {
    setSelectedRow(row.original);
    setViewModalOpen(true);
  };

  // Close Notification
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNotification(false);
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
        accessorKey: "owner",
        header: "Owner",
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
        accessorKey: "upload",
        header: "Upload",
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
      {
        accessorKey: "location",
        header: "Location",
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
        id: "actions",
        header: "Actions",
        // Display view & delete icons on actions column
        Cell: ({ row }) => (
          <div className="!p-0 !m-0 ">
            <IconButton onClick={() => handleViewDetails(row)}>
              <VisibilityIcon sx={{ color: "black" }} />
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
        List of Owners
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

  return (
    <>
      {/* Notification */}
      <Snackbar
        open={openNotification}
        onClose={handleClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {deleteError}
        </Alert>
      </Snackbar>

      {/* The whole table */}
      <MaterialReactTable table={table} />

      {/* Eye icon on click modal */}
      <Modal
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        aria-labelledby="view-modal-title"
        aria-describedby="view-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedRow && (
            <Box id="view-modal-description" sx={{ mt: 2 }}>
              <TextField
                label="Owner"
                value={selectedRow.owner}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Upload"
                value={selectedRow.upload}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Status"
                value={selectedRow.status}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Location"
                value={selectedRow.location}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
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
