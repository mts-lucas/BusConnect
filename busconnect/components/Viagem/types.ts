export interface Presenca  {
  ida: boolean;
  volta: boolean;
  horarioSaida: string | null;
};

export interface Rota  {
  origem: string;
  destino: string;
};

export interface Viagem  {
  id: number;
  data: string;
  turno: string;
  status: string;
  rota: Rota;
  presenca?: Presenca;
};