export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "medico" | "enfermeiro" | "administrador";
  crm?: string;
  specialty?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}
