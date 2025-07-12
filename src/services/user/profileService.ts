import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/TabebAI";

export interface PatientProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  mothers_name: string;
  fathers_name: string;
  blood_type: string | null;
  birth_date: string | null;
  weight: number;
  height: number;
  phone: string;
  gender: string;
   photo: string | File | null;
}

export const getProfile = async (): Promise<PatientProfile> => {
  const token = localStorage.getItem("token");
  const resp = await axios.get<PatientProfile[]>(
    `${API_BASE_URL}/overview/profile/`,
    {
      headers: {
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": 69420,
      },
    }
  );
  return resp.data[0];
};

export const updateProfile = async (
  id: number,
  data: Omit<Partial<PatientProfile>, "photo"> & { photo?: File | null }
): Promise<PatientProfile> => {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value as Blob | string); // ✅ Cast is safe
    }
  });

  const resp = await axios.put<PatientProfile[]>(
    `${API_BASE_URL}/overview/profile/${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return resp.data[0];
};

