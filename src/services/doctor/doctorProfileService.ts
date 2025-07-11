import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/TabebAI";

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers!["Authorization"] = `Bearer ${token}`;
  }
  config.headers!["ngrok-skip-browser-warning"] = "69420";
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export interface DoctorProfile {
  id: number;
  full_name: string;
  gender: "M" | "F";
  specialty: string;
  license_number: string;
  phone: string;
  national_id: string;
  region: string;
  neighborhood: string;
}

export async function getDoctorProfile(): Promise<DoctorProfile> {
  const resp = await api.get<DoctorProfile[]>("/DR/OverView/profile/");
  return resp.data[0];
}

export async function updateDoctorProfile(
  id: number,
  updates: Pick<DoctorProfile, "specialty" | "phone" | "region" | "neighborhood">
): Promise<DoctorProfile> {
  const resp = await api.put<DoctorProfile>(
    `/DR/OverView/profile/${id}/`,
    updates
  );
  return resp.data;
}