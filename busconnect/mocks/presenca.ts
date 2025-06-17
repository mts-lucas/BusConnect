import { Viagem } from "../components/Viagem/types";

export const viagensMock: Viagem[] = [
  {
    id: 1,
    data: '2025-06-16',
    turno: 'Manhã',
    status: 'Agendada',
    rota: {
      origem: 'Jucurutu',
      destino: 'Caicó'
    }
  },
  {
    id: 2,
    data: '2025-06-16',
    turno: 'Tarde',
    status: 'Agendada',
    rota: {
      origem: 'Jucurutu',
      destino: 'Assu'
    },
    presenca: {
      ida: true,
      volta: false,
      horarioSaida: null
    }
  },
  {
    id: 3,
    data: '2025-06-17',
    turno: 'Manhã',
    status: 'Agendada',
    rota: {
      origem: 'Caicó',
      destino: 'Jucurutu'
    }
  }
];