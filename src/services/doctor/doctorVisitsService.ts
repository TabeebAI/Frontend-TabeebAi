import axios from "axios";

export interface DoctorVisit {
  id: number;
  patient_name: string;
  treatment_name: string;
  created: string;
}

const API_BASE = "http://127.0.0.1:8000/TabebAI";

export async function getDoctorVisits(): Promise<DoctorVisit[]> {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");
  const resp = await axios.get<DoctorVisit[]>(`${API_BASE}/Doctor/visits/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return resp.data;
}
