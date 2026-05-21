import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  TableSortLabel,
  Pagination,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useState } from "react";

const statusColors = {
  PENDING: { label: "PENDING", color: "warning" },
  PAID: { label: "PAID", color: "success" },
  "PARTIALLY PAID": { label: "PARTIALLY PAID", color: "info" },
  OVERDUE: { label: "OVERDUE", color: "error" },
};

const TransactionsTable = ({ data, onEdit, onDelete, showForm }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("transactionDate");
  const [order, setOrder] = useState("desc");

  const handleSort = (col) => {
    if (orderBy === col) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(col);
      setOrder("asc");
    }
  };
  const ROWS_PER_PAGE = showForm ? 5 : 20;
  const filtered = data.filter((row) => {
    const q = search.toLowerCase();
    return (
      String(row.transactionId || "")
        .toLowerCase()
        .includes(q) ||
      String(row.from || "")
        .toLowerCase()
        .includes(q) ||
      String(row.to || "")
        .toLowerCase()
        .includes(q) ||
      String(row.type || "")
        .toLowerCase()
        .includes(q) ||
      String(row.status || "")
        .toLowerCase()
        .includes(q)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[orderBy] ?? "";
    const bVal = b[orderBy] ?? "";
    return order === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const totalPages = Math.ceil(sorted.length / ROWS_PER_PAGE);
  const paginated = sorted.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const columns = [
    { id: "transactionId", label: "ID" },
    { id: "transactionDate", label: "DATE" },
    { id: "from", label: "FROM (LENDER)" },
    { id: "to", label: "TO (BORROWER)" },
    { id: "type", label: "TYPE" },
    { id: "amount", label: "AMOUNT (₹)" },
    { id: "dueDate", label: "DUE DATE" },
    { id: "status", label: "STATUS" },
  ];

  return (
    <Paper sx={{ p: 2, borderRadius: "14px" }}>
      {/* Header row: title + search + filter */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FormatListBulletedIcon sx={{ color: "#1976d2" }} />
          <Typography variant="h6" fontWeight={600}>
            Transactions List
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 240 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            size="small"
            sx={{ borderRadius: "8px", whiteSpace: "nowrap" }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  color: "#555",
                  whiteSpace: "nowrap",
                }}
              >
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : "asc"}
                  onClick={() => handleSort(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              sx={{ fontWeight: 700, fontSize: "0.72rem", color: "#555" }}
            >
              ACTIONS
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginated.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={9}
                align="center"
                sx={{ py: 4, color: "#888" }}
              >
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            paginated.map((row) => {
              const statusConfig = statusColors[row.status?.toUpperCase()] || {
                label: row.status,
                color: "default",
              };
              return (
                <TableRow key={row.transactionId} hover>
                  <TableCell sx={{ fontWeight: 500, color: "#555" }}>
                    {row.transactionId}
                  </TableCell>
                  <TableCell>{row.transactionDate}</TableCell>
                  <TableCell>{row.from}</TableCell>
                  <TableCell>{row.to}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.type}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.72rem",
                        backgroundColor:
                          row.type === "LEND" ? "#e8f5e9" : "#fce4ec",
                        color: row.type === "LEND" ? "#2e7d32" : "#c62828",
                        border: `1px solid ${
                          row.type === "LEND" ? "#a5d6a7" : "#ef9a9a"
                        }`,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {Number(row.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell>{row.dueDate || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      label={statusConfig.label}
                      color={statusConfig.color}
                      size="small"
                      sx={{ fontWeight: 600, fontSize: "0.72rem" }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(row)}
                      sx={{ color: "#1976d2" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete && onDelete(row.transactionId)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Footer: count + pagination */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {Math.min((page - 1) * ROWS_PER_PAGE + 1, sorted.length)}–
          {Math.min(page * ROWS_PER_PAGE, sorted.length)} of {sorted.length}{" "}
          entries
        </Typography>

        <Stack spacing={1}>
          <Pagination
            count={totalPages || 1}
            page={page}
            onChange={(_, val) => setPage(val)}
            size="small"
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default TransactionsTable;
