import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  useTheme,
  styled
} from "@mui/material";
import { DoctorProfile } from "@/services/doctor/doctorProfileService";

export interface EditDoctorDialogProps {
  open: boolean;
  onClose: () => void;
  initial: DoctorProfile;
  onSave: (updates: Pick<DoctorProfile, "specialty" | "phone" | "region" | "neighborhood">) => Promise<boolean>;
}

const StyledTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export const EditDoctorDialog: React.FC<EditDoctorDialogProps> = ({
  open, onClose, initial, onSave
}) => {
  const theme = useTheme();
  const [form, setForm] = useState({
    specialty: "",
    phone: "",
    region: "",
    neighborhood: "",
  });
  const [saving, setSaving] = useState(false);

  // seed from initial
  useEffect(() => {
    if (initial) {
      setForm({
        specialty: initial.specialty,
        phone: initial.phone,
        region: initial.region,
        neighborhood: initial.neighborhood,
      });
    }
  }, [initial]);

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    const ok = await onSave(form);
    setSaving(false);
    if (ok) onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledTitle>Edit Profile</StyledTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Specialty"
            fullWidth
            value={form.specialty}
            onChange={handleChange("specialty")}
          />
          <TextField
            label="Phone"
            fullWidth
            value={form.phone}
            onChange={handleChange("phone")}
          />
          <TextField
            label="Region"
            fullWidth
            value={form.region}
            onChange={handleChange("region")}
          />
          <TextField
            label="Neighborhood"
            fullWidth
            value={form.neighborhood}
            onChange={handleChange("neighborhood")}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": { backgroundColor: theme.palette.primary.dark,  color: "white" }
          }}
        >
          {saving ? "Saving…" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
