export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
}