import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Stack,
  Avatar,
  MenuItem,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
export const PersonsTable = ({ persons, filters, onFilterChange, onEdit }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: "16px", overflow: "hidden" }}>
      <Table>
        <TableHead sx={{ background: "#f9fafb" }}>
          <TableRow>
            {[
              "Name",
              "Contact",
              "Email",
              "City",
              "State",
              "Relation",
              "Actions",
            ].map((head) => (
              <TableCell key={head} sx={{ fontWeight: "bold" }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {Object.keys(filters).map((key) => (
              <TableCell key={key}>
                {key === "relation" ? (
                  <TextField
                    select
                    name="relation"
                    value={filters.relation || ""}
                    onChange={onFilterChange}
                    size="small"
                    label="Search"
                    fullWidth
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="FRIEND">Friend</MenuItem>
                    <MenuItem value="FAMILY">Family</MenuItem>
                    <MenuItem value="COLLEAGUE">Colleague</MenuItem>
                    <MenuItem value="NEIGHBOUR">Neighbour</MenuItem>
                    <MenuItem value="RELATIVE">Relative</MenuItem>
                    <MenuItem value="BUSINESS_PARTNER">
                      Business Partner
                    </MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </TextField>
                ) : (
                  <TextField
                    name={key}
                    value={filters[key] || ""}
                    onChange={onFilterChange}
                    placeholder="Search"
                    size="small"
                    fullWidth
                  />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {persons.length > 0 ? (
            persons.map((p, i) => (
              <TableRow key={i} hover>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ bgcolor: "#4f46e5" }}>
                      {p.name?.charAt(0)}
                    </Avatar>
                    {p.name}
                  </Stack>
                </TableCell>
                <TableCell>{p.contactNumber}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.city}</TableCell>
                <TableCell>{p.state}</TableCell>
                <TableCell>{p.relation}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(p)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No persons found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

// export default PersonsTable;
