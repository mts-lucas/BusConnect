import { Viagem, Rota, PresencaAluno } from '../types'; // Importar os novos tipos

export type ConfirmarPresencaModalProps = {
  visible: boolean;
  onClose: () => void;
  // Ajuste o tipo da viagem para incluir os dados carregados
  viagem: (Viagem & { rotaData?: Rota, minhaPresenca?: PresencaAluno }) | null;
  horarioSaida: string;
  setHorarioSaida: (value: string) => void;
  onConfirm: (presenca: { ida: boolean; volta: boolean }) => void;
  onCancelPresenca: () => void;
};