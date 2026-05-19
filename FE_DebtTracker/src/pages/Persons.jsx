import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: ""
  });

  // Fetch persons
  const fetchPersons = async () => {
    try {
      const res = await API.get("/persons");
      setPersons(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async () => {
    try {
      await API.post("/persons", form);
      setForm({ name: "", phone: "", email: "" });
      setOpen(false);
      fetchPersons();
    } catch (err) {
      console.error(err);
    }
  };


  const [filters, setFilters] = useState({
  name: "",
  contactNumber: "",
  email: "",
  city: "",
  state: "",
  relation: ""
});

// filter logic
const filteredPersons = persons.filter((p) =>
  p.name.toLowerCase().includes(filters.name.toLowerCase()) &&
  p.contactNumber.includes(filters.contactNumber) &&
  p.email.toLowerCase().includes(filters.email.toLowerCase()) &&
  p.city.toLowerCase().includes(filters.city.toLowerCase()) &&
  p.state.toLowerCase().includes(filters.state.toLowerCase()) &&
  p.relation.toLowerCase().includes(filters.relation.toLowerCase())
);

// handle filter change
const handleFilterChange = (e) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value
  });
};

  return (
    <div>
      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}>
        <h1>Persons</h1>

        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          + Add Person
        </Button>
      </div>

  <div style={{
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
}}>

  <table style={{ width: "100%", borderCollapse: "collapse" }}>

    {/* HEADER */}
    <thead>
      <tr style={{ borderBottom: "1px solid #ddd" }}>
        <th>Name</th>
        <th>Contact</th>
        <th>Email</th>
        <th>City</th>
        <th>State</th>
        <th>Relation</th>
      </tr>

      {/* FILTER ROW */}
      <tr>
        <th><input name="name" onChange={handleFilterChange} placeholder="Search" /></th>
        <th><input name="contactNumber" onChange={handleFilterChange} placeholder="Search" /></th>
        <th><input name="email" onChange={handleFilterChange} placeholder="Search" /></th>
        <th><input name="city" onChange={handleFilterChange} placeholder="Search" /></th>
        <th><input name="state" onChange={handleFilterChange} placeholder="Search" /></th>
        <th><input name="relation" onChange={handleFilterChange} placeholder="Search" /></th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {filteredPersons.map((p, i) => (
        <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
          <td style={td}>{p.name}</td>
          <td style={td}>{p.contactNumber}</td>
          <td style={td}>{p.email}</td>
          <td style={td}>{p.city}</td>
          <td style={td}>{p.state}</td>
          <td style={td}>{p.relation}</td>
        </tr>
      ))}
    </tbody>

  </table>
</div>

      {/* MODAL FORM */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Person</DialogTitle>

        <DialogContent style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" }}>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// styles
const th = { padding: "12px", textAlign: "left" };
const td = { padding: "12px" };

export default Persons;