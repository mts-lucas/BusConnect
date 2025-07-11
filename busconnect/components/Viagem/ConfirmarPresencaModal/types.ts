import { ViagemPresenca } from '../types';

export type ConfirmarPresencaModalProps = {
  visible: boolean;
  onClose: () => void;
  viagem: ViagemPresenca | null;
  horarioSaida: string;
  setHorarioSaida: (value: string) => void;
  onConfirm: (presenca: { ida: boolean; volta: boolean }) => void;
  onCancelPresenca: () => void;
};