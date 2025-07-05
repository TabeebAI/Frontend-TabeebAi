import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDoctorProfile } from "@/hooks/api/doctorApi/useDoctorProfile";
import { EditDoctorDialog } from "./components/modal/EditProfileDialog";

const labelStyle = { fontWeight: 500, color: "text.secondary" };

const ProfilePage: React.FC = () => {
  const { profile, loading, error, save } = useDoctorProfile();
  const [open, setOpen] = useState(false);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!profile) return null;

  const rows: [string, React.ReactNode][] = [
    ["Full Name", profile.full_name],
    ["Gender", profile.gender === "M" ? "Male" : "Female"],
    ["Specialty", profile.specialty],
    ["License Number", profile.license_number],
    ["Phone", profile.phone],
    ["National ID", profile.national_id],
    ["Region", profile.region],
    ["Neighborhood", profile.neighborhood],
  ];

  return (
    <Box p={4} maxWidth={800} mx="auto">
      <Typography variant="h4" gutterBottom>
        Doctor Profile
      </Typography>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            {rows.map(([lbl, val]) => (
              <Grid size={{ xs: 12, sm: 6 }} key={lbl}>
                <Typography sx={labelStyle}>{lbl}</Typography>
                <Typography>{val || "—"}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <Divider />
        <Box p={2} textAlign="right">
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              "&:hover": { color: "white" },
            }}
          >
            Edit Profile
          </Button>
        </Box>
      </Card>

      <EditDoctorDialog
        open={open}
        onClose={() => setOpen(false)}
        initial={profile}
        onSave={save}
      />
    </Box>
  );
};

export default ProfilePage;
