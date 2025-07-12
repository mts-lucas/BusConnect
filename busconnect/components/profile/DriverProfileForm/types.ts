import { Timestamp } from "firebase/firestore";

export interface DriverUserData {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehiclePlate: string;
  fotoUrl: string;
  createdAt: Timestamp;
  role?: string; // Adicionado para consistência, se usado no Firestore
}

export interface DriverProfileFormProps {
  initialData: DriverUserData;
  userUid: string;
}