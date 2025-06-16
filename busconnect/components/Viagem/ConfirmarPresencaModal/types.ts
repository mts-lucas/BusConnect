import { Viagem } from '../types';

export interface ConfirmarPresencaModalProps {
  visible: boolean;
  onClose: () => void;
  viagem: Viagem | null;
  horarioSaida: string;
  setHorarioSaida: (value: string) => void;
  onConfirm: () => void;
  onCancelPresenca: () => void;
}