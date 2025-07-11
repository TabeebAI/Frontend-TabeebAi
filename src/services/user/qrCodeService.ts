import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/TabebAI";

export async function getQrCode(): Promise<Blob> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token');
  const resp = await axios.get(`${API_BASE_URL}/QRcode/`, {
    responseType: 'blob',
    headers: {
      "Authorization": `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
  });
  console.log(resp.data)
  return resp.data as Blob;
}