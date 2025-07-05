import axios from 'axios';

const API_BASE_URL = 'https://2478-137-184-161-129.ngrok-free.app/TabebAI';

export async function getQrCode(): Promise<Blob> {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token');
  const resp = await axios.get(`${API_BASE_URL}/QRcode/`, {
    responseType: 'blob',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return resp.data as Blob;
}