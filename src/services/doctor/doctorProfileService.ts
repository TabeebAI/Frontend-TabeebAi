import { api } from "../helper/api";

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