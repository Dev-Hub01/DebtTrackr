import {
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useState } from "react";
import API from "../services/api";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
const TransactionForm = ({ fetchTransactions }) => {
  const formik = useFormik({
    initialValues: {
      transactionNo: "",
      fromPerson: "",
      toPerson: "",
      type: "",
      amount: "",
      transactionDate: null,
      dueDate: null,
      paymentMode: "",
      category: "",
      remarks: "",
    },
    validationSchema: Yup.object({
      transactionNo: Yup.string().required("Transaction number is required"),
      type: Yup.string().required("Type is required"),

      fromPerson: Yup.string().required("From is required"),

      toPerson: Yup.string().required("To is required"),

      amount: Yup.number()
        .typeError("Must be a number")
        .required("Amount is required"),

      transactionDate: Yup.date()
        .nullable()
        .required("Transaction date required"),
      dueDate: Yup.date().nullable().required("Due date required"),

      paymentMode: Yup.string().required("Payment mode required"),

      category: Yup.string().required("Category required"),

      remarks: Yup.string().required("Remarks required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        await API.post("/transaction/create", values);
        resetForm();
        fetchTransactions();
      } catch (error) {
        console.error("API failed", error);
      }
    },
  });

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: "14px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <ReceiptLongIcon sx={{ color: "#1976d2" }} />
        <Typography variant="h6" fontWeight={600} color="primary">
          Create Transaction
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* ROW 1 */}

          <Grid item size={3}>
            <TextField
              select
              label="Type"
              name="type"
              fullWidth
              size="small"
              {...formik.getFieldProps("type")}
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="LEND">LEND</MenuItem>
              <MenuItem value="BORROW">BORROW</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={3}>
            <TextField
              label="Transaction Number"
              name="transactionNo"
              fullWidth
              size="small"
              {...formik.getFieldProps("transactionNo")}
              error={
                formik.touched.transactionNo &&
                Boolean(formik.errors.transactionNo)
              }
              helperText={
                formik.touched.transactionNo && formik.errors.transactionNo
              }
            />
          </Grid>

          <Grid item size={3}>
            <TextField
              select
              label="From"
              name="fromPerson"
              fullWidth
              size="small"
              {...formik.getFieldProps("fromPerson")}
              error={
                formik.touched.fromPerson && Boolean(formik.errors.fromPerson)
              }
              helperText={formik.touched.fromPerson && formik.errors.fromPerson}
            >
              <MenuItem value="">Select Person</MenuItem>
              <MenuItem value="1">Rakesh</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={3}>
            <TextField
              select
              label="To"
              name="toPerson"
              fullWidth
              size="small"
              {...formik.getFieldProps("toPerson")}
              error={formik.touched.toPerson && Boolean(formik.errors.toPerson)}
              helperText={formik.touched.toPerson && formik.errors.toPerson}
            >
              <MenuItem value="">Select Person</MenuItem>
              <MenuItem value="2">Suresh</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={3}>
            <TextField
              label="Amount (₹)"
              name="amount"
              fullWidth
              size="small"
              {...formik.getFieldProps("amount")}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Grid>

          {/* ROW 2 */}
          <Grid item size={3}>
            <DatePicker
              label="Transaction Date"
              value={
                formik.values.transactionDate
                  ? dayjs(formik.values.transactionDate)
                  : null
              }
              onChange={(val) =>
                formik.setFieldValue(
                  "transactionDate",
                  val ? val.format("YYYY-MM-DD") : null
                )
              }
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error:
                    formik.touched.transactionDate &&
                    Boolean(formik.errors.transactionDate),
                  helperText:
                    formik.touched.transactionDate &&
                    formik.errors.transactionDate,
                },
              }}
            />
          </Grid>

          <Grid item size={3}>
            <DatePicker
              label="Due Date"
              value={
                formik.values.dueDate ? dayjs(formik.values.dueDate) : null
              }
              onChange={(val) =>
                formik.setFieldValue(
                  "dueDate",
                  val ? val.format("YYYY-MM-DD") : null
                )
              }
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error:
                    formik.touched.dueDate && Boolean(formik.errors.dueDate),
                  helperText: formik.touched.dueDate && formik.errors.dueDate,
                },
              }}
            />
          </Grid>

          <Grid item size={3}>
            <TextField
              select
              label="Payment Mode"
              name="paymentMode"
              fullWidth
              size="small"
              {...formik.getFieldProps("paymentMode")}
              error={
                formik.touched.paymentMode && Boolean(formik.errors.paymentMode)
              }
              helperText={
                formik.touched.paymentMode && formik.errors.paymentMode
              }
            >
              <MenuItem value="">Select Mode</MenuItem>
              <MenuItem value="CASH">Cash</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="BANK">Bank Transfer</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={3}>
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              size="small"
              {...formik.getFieldProps("category")}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="PERSONAL">Personal</MenuItem>
              <MenuItem value="BUSINESS">Business</MenuItem>
            </TextField>
          </Grid>

          <Grid item size={9}>
            <TextField
              label="Remarks"
              name="remarks"
              fullWidth
              multiline
              size="small"
              //   rows={3}
              {...formik.getFieldProps("remarks")}
              error={formik.touched.remarks && Boolean(formik.errors.remarks)}
              helperText={formik.touched.remarks && formik.errors.remarks}
            />
          </Grid>
        </Grid>

        {/* ACTION BUTTONS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2.5,
            gap: 1.5,
          }}
        >
          <Button
            variant="outlined"
            onClick={formik.handleReset}
            sx={{ borderRadius: "8px", px: 3 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveIcon />}
            sx={{ borderRadius: "8px", px: 3 }}
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          >
            Save Transaction
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TransactionForm;
