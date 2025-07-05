export interface Patient {
  id: string;
  username: string;
  first_name: string,
  last_name: string,
  mothers_name: string,
  fathers_name: string,
  blood_type: string,
  birth_date: string;
  gender: string;
  email: string;
  phone: string;
  avatarUrl: string;
  weight: number;
  height: number;
}

export interface Operation {
  id: string;
  date: string;
  type: string;
  surgeon: string;
  notes: string;
}