import React from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
  styled,
} from "@mui/material";

export interface EditPatientForm {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  mothers_name: string;
  fathers_name: string;
  blood_type: string | null;
  birth_date: string | null;
  weight: string;
  height: string;
  phone: string;
  gender: string;
  photo: File | null;
}

export interface EditPatientDialogProps {
  open: boolean;
  onClose: () => void;
  formState: EditPatientForm;
  onChange: (field: keyof EditPatientForm, value) => void;
  onSave: () => void;
}

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const GridContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,
  "@media (min-width:600px)": {
    gridTemplateColumns: "1fr 1fr",
  },
});

const FullWidthBox = styled(Box)({
  gridColumn: "1 / -1",
});

const EditPatientDialog: React.FC<EditPatientDialogProps> = ({
  open,
  onClose,
  formState,
  onChange,
  onSave,
}) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <StyledDialogTitle>Edit Patient Information</StyledDialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        <GridContainer>
          <TextField
            label="Username"
            fullWidth
            value={formState.username}
            InputProps={{ readOnly: false }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={formState.email}
            InputProps={{ readOnly: false }}
          />

          <TextField
            label="First Name"
            fullWidth
            value={formState.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            value={formState.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
          />

          <TextField
            label="Mother's Name"
            fullWidth
            value={formState.mothers_name}
            onChange={(e) => onChange("mothers_name", e.target.value)}
          />
          <TextField
            label="Father's Name"
            fullWidth
            value={formState.fathers_name}
            onChange={(e) => onChange("fathers_name", e.target.value)}
          />

          <FormControl fullWidth>
            <InputLabel>Blood Type</InputLabel>
            <Select
              label="Blood Type"
              value={formState.blood_type || ""}
              onChange={(e) => onChange("blood_type", e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {bloodTypes.map((bt) => (
                <MenuItem key={bt} value={bt}>
                  {bt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              value={formState.gender}
              onChange={(e) => onChange("gender", e.target.value)}
            >
              <MenuItem value="male">ذكر</MenuItem>
              <MenuItem value="female">انثى</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Birth Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formState.birth_date || ""}
            onChange={(e) => onChange("birth_date", e.target.value)}
          />

          <TextField
            label="Height (cm)"
            type="number"
            fullWidth
            value={formState.height}
            onChange={(e) => onChange("height", e.target.value)}
          />
          <TextField
            label="Weight (kg)"
            type="number"
            fullWidth
            value={formState.weight}
            onChange={(e) => onChange("weight", e.target.value)}
          />

          <TextField
            label="Phone"
            fullWidth
            value={formState.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />

          <FullWidthBox>
            <Button variant="outlined" component="label" fullWidth>
              {formState.photo ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onChange("photo", e.target.files?.[0] || null)}
              />
            </Button>
            {formState.photo && (
              <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                Selected: {formState.photo.name}
              </Typography>
            )}
          </FullWidthBox>
        </GridContainer>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{color: "black"}}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              color: "white"
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPatientDialog;
