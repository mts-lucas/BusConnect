import { Timestamp } from 'firebase/firestore';

export interface StudentUserData {
  name: string;
  email: string;
  phone: string;
  registration: string;
  institution: string;
  local: string;
  horarioAula: string;
  fotoUrl: string;
  createdAt: Timestamp;
  role?: string; // Adicionado para consistência, se usado no Firestore
}

export interface StudentProfileFormProps {
  initialData: StudentUserData;
  userUid: string;
}