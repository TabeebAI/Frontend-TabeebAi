import axios from "axios";

const API_BASE = "https://2478-137-184-161-129.ngrok-free.app/TabebAI/DR";

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