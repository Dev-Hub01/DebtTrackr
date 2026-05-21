import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TransactionForm from "./TransactionForm";
import TransactionsTable from "./TransactionsTable";
import EditTransactionModal from "./EditTransactionModal";
import API from "../services/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const fetchTransactions = async () => {
    const res = await API.get("/transaction");
    setTransactions(res.data || []);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleEdit = (row) => {
    setEditData(row);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditData(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Transactions
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setShowForm((v) => !v)}
          sx={{ borderRadius: "8px", px: 2.5, py: 1 }}
        >
          Create Transaction
        </Button>
      </Box>

      {/* Create Transaction Form */}
      {showForm && (
        <TransactionForm
          onSuccess={fetchTransactions}
          fetchTransactions={fetchTransactions}
        />
      )}

      <TransactionsTable
        data={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showForm={showForm}
      />
      <EditTransactionModal
        open={openModal}
        data={editData}
        onClose={handleClose}
        onSuccess={fetchTransactions}
      />
    </Box>
  );
};

export default Transactions;
