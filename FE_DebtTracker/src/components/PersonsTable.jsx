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
  } from "@mui/material";
  
 export  const PersonsTable = ({ persons, filters, onFilterChange }) => {
    return (
      <Paper elevation={3} sx={{ borderRadius: "16px", overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ background: "#f9fafb" }}>
            <TableRow>
              {["Name", "Contact", "Email", "City", "State", "Relation"].map(
                (head) => (
                  <TableCell key={head} sx={{ fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
  
            <TableRow>
              {Object.keys(filters).map((key) => (
                <TableCell key={key}>
                  <TextField
                    name={key}
                    onChange={onFilterChange}
                    placeholder="Search"
                    size="small"
                    fullWidth
                  />
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