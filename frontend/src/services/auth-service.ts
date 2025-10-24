import axios from "axios";
import { SignInPayload, SignInResponse } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export const authService = {
  async signIn(payload: SignInPayload): Promise<SignInResponse> {
    const { data } = await axios.post<SignInResponse>(`${API_BASE_URL}/auth/login`, payload);
    return data;
  },
  async signOut(): Promise<void> {
    await axios.post(`${API_BASE_URL}/auth/logout`);
  }
};
