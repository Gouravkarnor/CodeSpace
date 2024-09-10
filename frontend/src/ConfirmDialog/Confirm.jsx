import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const CustomConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  description = "Are you sure?",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md" // Set maxWidth (xs, sm, md, lg, xl)
      fullWidth // Ensures the dialog takes up the full width available
      PaperProps={{
        style: {
          width: "500px", // Custom width
          backgroundColor: "#272727e8", // Background color
          color: "white", // Text color
        },
      }}
    >
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <Typography style={{ color: "white" }}>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{ color: "gray" }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          style={{ color: "white", backgroundColor: "red" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomConfirmDialog;
