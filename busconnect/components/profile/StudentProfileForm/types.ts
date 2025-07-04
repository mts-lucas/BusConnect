export interface StudentUserData {
  name: string;
  email: string;
  senha: string;
  telefone: string;
  registration: string;
  institution: string;
  localidade: string;
  horarioAula: string;
  fotoUrl: string;
}

export interface StudentProfileFormProps {
  initialData: StudentUserData;
}