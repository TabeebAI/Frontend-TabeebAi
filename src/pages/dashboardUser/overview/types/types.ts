export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  avatarUrl: string;
  bloodType: string;
  heightCm: number;
  weightKg: number;
}

export interface Operation {
  id: string;
  date: string;
  type: string;
  surgeon: string;
  notes: string;
}