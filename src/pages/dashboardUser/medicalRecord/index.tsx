// src/pages/MedicalRecordsPage.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  useTheme,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// --- Define a type for your record
interface MedicalRecord {
  id: string;
  date: string;          // ISO date
  doctor: string;
  diagnosis: string;
  notes: string;
  attachments: number;    // count of files/scans
}

// --- mock fetch
const fetchMedicalRecords = async (): Promise<MedicalRecord[]> => [
  {
    id: "MR-001",
    date: "2023-01-15",
    doctor: "Dr. Alice Smith",
    diagnosis: "Type II Diabetes",
    notes: "Started metformin 500mg daily",
    attachments: 2,
  },
  {
    id: "MR-002",
    date: "2023-05-10",
    doctor: "Dr. Bob Jones",
    diagnosis: "Hypertension",
    notes: "Adjusted lisinopril dose to 20mg",
    attachments: 1,
  },
  // …more records
];

type Order = "asc" | "desc";

export default function MedicalRecordsPage() {
  const theme = useTheme();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filter, setFilter] = useState("");
  const [orderBy, setOrderBy] = useState<keyof MedicalRecord>("date");
  const [order, setOrder] = useState<Order>("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchMedicalRecords().then(setRecords);
  }, []);

  // filtering
  const filtered = records.filter((r) =>
    [r.date, r.doctor, r.diagnosis, r.notes]
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  // sorting
  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  // pagination slice
  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (property: keyof MedicalRecord) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Medical Records
      </Typography>

      <Paper sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}>
        <TextField
          label="Search records…"
          variant="outlined"
          size="small"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { id: "date", label: "Date" },
                { id: "doctor", label: "Doctor" },
                { id: "diagnosis", label: "Diagnosis" },
                { id: "notes", label: "Notes" },
                { id: "attachments", label: "Attachments" },
                { id: "actions", label: "View" },
              ].map((col) => (
                <TableCell key={col.id}>
                  {col.id !== "actions" ? (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : "asc"}
                      onClick={() => handleSort(col.id as keyof MedicalRecord)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((rec) => (
              <TableRow hover key={rec.id}>
                <TableCell>{new Date(rec.date).toLocaleDateString()}</TableCell>
                <TableCell>{rec.doctor}</TableCell>
                <TableCell>{rec.diagnosis}</TableCell>
                <TableCell>
                  <Typography noWrap maxWidth={200}>
                    {rec.notes}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Avatar sx={{ bgcolor: theme.palette.primary.light, width: 32, height: 32 }}>
                    {rec.attachments}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={sorted.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
}
