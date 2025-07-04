export interface DriverUserData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  licenseNumber: string;
  vehiclePlate: string;
  fotoUrl: string;
}

export interface DriverProfileFormProps {
  initialData: DriverUserData;
}
