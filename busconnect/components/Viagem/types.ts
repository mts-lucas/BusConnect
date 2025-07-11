import { DriverUserData } from "../profile/DriverProfileForm/types";
import { DocumentReference } from "firebase/firestore";

export interface Presenca  {
  ida: boolean;
  volta: boolean;
  horarioSaida: string | null;
};

export interface Rota {
  id: string;
  origem: string;
  destino: string;
}

export interface Viagem {
  id?: string;
  data: string;
  rota: Rota | DocumentReference;
  horario: string;
  status: string;
  motorista: DriverUserData | DocumentReference;
}

export interface ViagemPresenca  {
  id?: number;
  data: string;
  turno: string;
  status: string;
  rota: Rota;
  presenca?: Presenca;
};