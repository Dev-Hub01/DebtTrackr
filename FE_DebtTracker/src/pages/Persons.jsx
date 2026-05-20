import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useFormik } from "formik";
import * as Yup from "yup";
import { PersonsTable } from "../components/PersonsTable";
import { NoData } from "../components/NoData";

const Persons = () => {
  const [persons, setPersons] = useState([]);
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    contactNumber: "",
    email: "",
    city: "",
    state: "",
    relation: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),

    contactNumber: Yup.string()
      .matches(/^(?:\+91)?[6-9]\d{9}$/, "Enter valid phone number")
      .required("Phone is required"),

    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),

    city: Yup.string().trim().required("City is required"),

    state: Yup.string().trim().required("State is required"),

    relation: Yup.string().required("Relation is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      email: "",
      city: "",
      state: "",
      relation: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await API.post("/persons/create", values);
        fetchPersons();
        resetForm();
        setOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

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

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };
  const filteredPersons = persons.filter(
    (p) =>
      p.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (p.contactNumber || "").includes(filters.contactNumber) &&
      p.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      p.city.toLowerCase().includes(filters.city.toLowerCase()) &&
      p.state.toLowerCase().includes(filters.state.toLowerCase()) &&
      p.relation.toLowerCase().includes(filters.relation.toLowerCase())
  );

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <Box sx={{ p: 3, background: "#f5f7fb", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Persons</Typography>

        {persons.length > 0 && (
          <Button variant="contained" color="primary" onClick={handleAdd}>
            + Add Person
          </Button>
        )}
      </Box>

      {persons.length === 0 ? (
        <NoData onAdd={handleAdd} />
      ) : (
        <PersonsTable
          persons={filteredPersons}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      )}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Person</DialogTitle>

        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.contactNumber && !!formik.errors.contactNumber
            }
            helperText={
              formik.touched.contactNumber && formik.errors.contactNumber
            }
          />

          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            label="City"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && !!formik.errors.city}
            helperText={formik.touched.city && formik.errors.city}
          />

          <TextField
            label="State"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && !!formik.errors.state}
            helperText={formik.touched.state && formik.errors.state}
          />

          <FormControl
            fullWidth
            error={formik.touched.relation && !!formik.errors.relation}
          >
            <InputLabel>Relation</InputLabel>
            <Select
              name="relation"
              value={formik.values.relation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Relation"
            >
              <MenuItem value="FRIEND">Friend</MenuItem>
              <MenuItem value="FAMILY">Family</MenuItem>
              <MenuItem value="COLLEAGUE">Colleague</MenuItem>
              <MenuItem value="NEIGHBOUR">Neighbour</MenuItem>
              <MenuItem value="RELATIVE">Relative</MenuItem>
              <MenuItem value="BUSINESS_PARTNER">Business Partner</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>

            {formik.touched.relation && formik.errors.relation && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.relation}
              </p>
            )}
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Persons;
