import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import API from "../services/api";

const statusOptions = ["PENDING", "PAID", "PARTIALLY PAID", "OVERDUE"];
const paymentModes = ["CASH", "UPI", "BANK"];
const categories = ["PERSONAL", "BUSINESS"];

const EditTransactionModal = ({ open, onClose, data, onSuccess }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await API.put(`/transactions/${form.transactionId}`, form);
    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Edit Transaction
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {form.transactionId}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Amount (₹)"
              name="amount"
              value={form.amount || ""}
              fullWidth
              size="small"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Status"
              name="status"
              value={form.status || ""}
              fullWidth
              size="small"
              onChange={handleChange}
            >
              {statusOptions.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Transaction Date"
              name="transactionDate"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={form.transactionDate || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Due Date"
              name="dueDate"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={form.dueDate || ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Payment Mode"
              name="paymentMode"
              fullWidth
              size="small"
              value={form.paymentMode || ""}
              onChange={handleChange}
            >
              {paymentModes.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              size="small"
              value={form.category || ""}
              onChange={handleChange}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              multiline
              rows={3}
              value={form.notes || ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: "8px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{ borderRadius: "8px" }}
        >
          Update Transaction
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionModal;
