export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface IAuthContext {
  isUserLogged: boolean | null;
  user: User | null;
  login: (credentials: LoginParams) => Promise<string>;
  logout: () => void;
  register: (credentials: RegisterParams) => Promise<void>;
}
