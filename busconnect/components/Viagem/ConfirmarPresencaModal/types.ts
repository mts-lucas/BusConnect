import { Viagem } from '../types';

export type ConfirmarPresencaModalProps = {
  visible: boolean;
  onClose: () => void;
  viagem: Viagem | null;
  horarioSaida: string;
  setHorarioSaida: (value: string) => void;
  onConfirm: (presenca: { ida: boolean; volta: boolean }) => void;
  onCancelPresenca: () => void;
};