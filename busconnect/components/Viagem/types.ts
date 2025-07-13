import { DriverUserData } from "../profile/DriverProfileForm/types";// Ajuste o path se necessário
import { DocumentReference } from "firebase/firestore";

export interface PresencaAluno { // Renomeado para PresencaAluno para clareza
  estudanteRef: DocumentReference; // Referência ao perfil do estudante na coleção 'users'
  nomeEstudante: string; // Nome para facilitar exibição, mas o UID é a chave
  ida: boolean;
  volta: boolean;
  horarioSaida: string | null;
  timestampConfirmacao: Date; // Para registrar quando a presença foi adicionada/modificada
}

export interface Rota {
  id: string;
  origem: string;
  destino: string;
}

export interface Viagem {
  id?: string; // ID gerado pelo Firestore
  data: string;
  rota: DocumentReference; // Referência à rota
  horario: string; // Manhã, Tarde, Noite (ou um formato de horário específico)
  status: string; // Aberto, Fechado, Confirmado, Cancelado, Finalizado
  motorista: DocumentReference; // Referência ao motorista
  presencasAlunos?: PresencaAluno[]; // NOVO: Array para armazenar as presenças dos alunos
}

// Opcional: Se você ainda precisa de um tipo para exibir a viagem na tela de presença com dados completos
// export interface ViagemPresencaUI extends Omit<Viagem, 'rota' | 'motorista'> {
//   rotaData: Rota; // Dados completos da rota
//   motoristaData: DriverUserData; // Dados completos do motorista
//   minhaPresenca?: PresencaAluno; // A presença do usuário atual, se existir
// }