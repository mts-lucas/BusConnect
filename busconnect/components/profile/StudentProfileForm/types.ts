export interface StudentUserData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  matricula: string;
  instituicao: string;
  localidade: string;
  horarioAula: string;
  fotoUrl: string;
}

export interface StudentProfileFormProps {
  initialData: StudentUserData;
}