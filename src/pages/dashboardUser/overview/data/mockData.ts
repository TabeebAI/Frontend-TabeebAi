import { Patient, Operation } from "../types/types";

export const mockPatient: Patient = {
  id: "P-12345",
  name: "Jane Doe",
  dob: "1985-06-15",
  gender: "Female",
  email: "jane.doe@example.com",
  phone: "+1 (555) 123-4567",
  avatarUrl: "https://i.pravatar.cc/150?img=47",
  bloodType: "O+",
  heightCm: 168,
  weightKg: 65,
};

export const mockOperations: Operation[] = [
  {
    id: "OP-001",
    date: "2021-03-22",
    type: "Appendectomy",
    surgeon: "Dr. John Smith",
    notes: "Laparoscopic, no complications",
  },
  {
    id: "OP-002",
    date: "2022-11-05",
    type: "Knee Arthroscopy",
    surgeon: "Dr. Susan Lee",
    notes: "Meniscus repair",
  },
];