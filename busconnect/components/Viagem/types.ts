import { DriverUserData } from "../profile/DriverProfileForm/types";

export interface Presenca  {
  ida: boolean;
  volta: boolean;
  horarioSaida: string | null;
};

export interface Rota {
  id?: string;
  origem: string;
  destino: string;
}

export interface Viagem {
  id?: string;
  data: string;
  rota: Rota; 
  horario: string;
  status: string;
  motorista: DriverUserData;
}

export interface ViagemPresenca  {
  id?: number;
  data: string;
  turno: string;
  status: string;
  rota: Rota;
  presenca?: Presenca;
};