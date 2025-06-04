import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Patient, Operation } from "./types/types";
import { fetchPatient, fetchOperations } from "@services/overviewService";

const PatientOverview: React.FC = () => {
  const theme = useTheme();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [operations, setOperations] = useState<Operation[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchPatient().then((p) => {
      setPatient(p);
      setFormState({ name: p.name, email: p.email, phone: p.phone });
    });
    fetchOperations().then(setOperations);
  }, []);

  if (!patient) return <Typography>Loading patient data…</Typography>;

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleSave = () => {
    // TODO: call API to save formState, then refresh patient
    setPatient((prev) => prev && { ...prev, ...formState });
    setEditOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header + Edit Button */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={patient.avatarUrl}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h4" fontWeight={600}>
              {patient.name}
            </Typography>
            <Typography color="textSecondary">
              ID: {patient.id} • DOB: {patient.dob} • {patient.gender}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEditOpen}
          sx={{
            backgroundColor: "primary.main",
            color: "common.black",
            "&:hover": {
              backgroundColor: "primary.dark",
              color: "common.white",
              "& .MuiSvgIcon-root": {
                color: "common.white",
              },
            },
          }}
        >
          Edit
        </Button>
      </Box>

      {/* Vitals / Details Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          { label: "Email", value: patient.email },
          { label: "Phone", value: patient.phone },
          { label: "Blood Type", value: patient.bloodType },
          { label: "Height", value: `${patient.heightCm} cm` },
          { label: "Weight", value: `${patient.weightKg} kg` },
        ].map(({ label, value }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {label}
                </Typography>
                <Typography variant="h6">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Previous Operations Table */}
      <Typography variant="h5" gutterBottom>
        Previous Operations
      </Typography>
      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Surgeon</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {operations.map((op) => (
              <TableRow key={op.id}>
                <TableCell>{op.date}</TableCell>
                <TableCell>{op.type}</TableCell>
                <TableCell>{op.surgeon}</TableCell>
                <TableCell>{op.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Patient Info</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Name"
              fullWidth
              value={formState.name}
              onChange={(e) =>
                setFormState((s) => ({ ...s, name: e.target.value }))
              }
            />
            <TextField
              label="Email"
              fullWidth
              value={formState.email}
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
            <TextField
              label="Phone"
              fullWidth
              value={formState.phone}
              onChange={(e) =>
                setFormState((s) => ({ ...s, phone: e.target.value }))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientOverview;
