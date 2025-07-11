import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/TabebAI/DR";

export interface DoctorLoginPayload {
  full_name: string;
  national_id: string;
  license_number: string;
}
export interface DoctorLoginResponse {
  access: string;
}

export async function loginDoctor(
  payload: DoctorLoginPayload
): Promise<DoctorLoginResponse> {
  const resp = await axios.post<DoctorLoginResponse>(
    `${API_BASE}/login/`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return resp.data;
}