import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
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
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Operation } from "./types/types";
import { useProfile } from "@/hooks/api/userApi/getpostprofile";
import EditPatientDialog, {
  EditPatientForm,
} from "./components/dialog/EditPatientDialog";
import QrCodeModal from "./components/dialog/QrCodeModal";

const PatientOverview: React.FC = () => {
  const theme = useTheme();
  const {
    profile: patient,
    loading: loadingProfile,
    error: profileError,
    save,
  } = useProfile();

  // Local UI state
  const [operations] = useState<Operation[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const [formState, setFormState] = useState<EditPatientForm>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    mothers_name: "",
    fathers_name: "",
    blood_type: null,
    birth_date: null,
    weight: "",
    height: "",
    phone: "",
    gender: "",
    photo: null,
  });

  // Seed form when patient loads
  useEffect(() => {
    if (!patient) return;
    setFormState({
      username: patient.username,
      email: patient.email,
      first_name: patient.first_name,
      last_name: patient.last_name,
      mothers_name: patient.mothers_name || "",
      fathers_name: patient.fathers_name || "",
      blood_type: patient.blood_type,
      birth_date: patient.birth_date,
      weight: patient.weight != null ? patient.weight.toString() : "",
      height: patient.height != null ? patient.height.toString() : "",
      phone: patient.phone,
      gender: patient.gender,
      photo: null,
    });
  }, [patient]);

  // Handlers
  if (loadingProfile) return <CircularProgress />;
  if (profileError)
    return <Typography color="error">{profileError}</Typography>;
  if (!patient) return null;

  const handleSave = async () => {
    const ok = await save({
      username: formState.username,
      email: formState.email,
      first_name: formState.first_name,
      last_name: formState.last_name,
      mothers_name: formState.mothers_name,
      fathers_name: formState.fathers_name,
      blood_type: formState.blood_type,
      birth_date: formState.birth_date!,
      weight: parseFloat(formState.weight),
      height: parseFloat(formState.height),
      phone: formState.phone,
      gender: formState.gender,
    });
    if (ok) setEditOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={patient.photo || undefined}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h4" fontWeight={600}>
              {patient.first_name} {patient.last_name}
            </Typography>
            <Typography color="textSecondary">
              ID: {patient.username} • DOB:{" "}
              {patient.birth_date
                ? new Date(patient.birth_date).toLocaleDateString()
                : "—"}{" "}
              • {patient.gender || "—"}
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center">
          {/* Show QR Button */}
          <Button
          variant="contained"
            startIcon={<QrCodeIcon />}
            onClick={() => setQrOpen(true)}
            sx={{
              marginRight: 2,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                color: "white",
              },
            }}
          >
            Show QR
          </Button>

          {/* Edit Button */}
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setEditOpen(true)}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                color: "white",
              },
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      {/* Detail Cards */}
      <Grid container spacing={2} mb={4}>
        {[
          { label: "Username", value: patient.username },
          { label: "Email", value: patient.email },
          { label: "Phone", value: patient.phone || "—" },
          { label: "Blood Type", value: patient.blood_type || "—" },
          {
            label: "Height",
            value: patient.height ? `${patient.height} cm` : "—",
          },
          {
            label: "Weight",
            value: patient.weight ? `${patient.weight} kg` : "—",
          },
        ].map(({ label, value }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {label}
                </Typography>
                <Typography variant="h6" noWrap>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* Operations Table */}
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
                <TableCell>{new Date(op.date).toLocaleDateString()}</TableCell>
                <TableCell>{op.type}</TableCell>
                <TableCell>{op.surgeon}</TableCell>
                <TableCell>{op.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* QR Modal */}
      <QrCodeModal open={qrOpen} onClose={() => setQrOpen(false)} />

      {/* Edit Dialog */}
      <EditPatientDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        formState={formState}
        onChange={(field, value) =>
          setFormState((prev) => ({ ...prev, [field]: value }))
        }
        onSave={handleSave}
      />
    </Container>
  );
};

export default PatientOverview;
