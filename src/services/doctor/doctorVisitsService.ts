import axios from "axios";

export interface DoctorVisit {
  id: number;
  patient_name: string;
  treatment_name: string;
  created: string;
}

const API_BASE = "https://2478-137-184-161-129.ngrok-free.app/TabebAI";

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
