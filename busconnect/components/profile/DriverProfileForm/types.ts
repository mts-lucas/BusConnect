import { Timestamp } from "firebase/firestore";

export interface DriverUserData {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehiclePlate: string;
  fotoUrl: string;
  createdAt: Timestamp;
}

export interface DriverProfileFormProps {
  initialData: DriverUserData;
}
