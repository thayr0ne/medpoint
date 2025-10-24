import axios from "axios";
import { Prescription } from "@/types/prescription";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export const prescriptionService = {
  async create(prescription: Prescription) {
    const { data } = await axios.post<Prescription>(`${API_BASE_URL}/prescriptions`, prescription);
    return data;
  },
  async getById(id: string) {
    const { data } = await axios.get<Prescription>(`${API_BASE_URL}/prescriptions/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<Prescription>) {
    const { data } = await axios.put<Prescription>(`${API_BASE_URL}/prescriptions/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await axios.delete(`${API_BASE_URL}/prescriptions/${id}`);
  },
  async getByPatient(patientId: string) {
    const { data } = await axios.get<Prescription[]>(`${API_BASE_URL}/patients/${patientId}/prescriptions`);
    return data;
  },
  async getRecent(limit = 5) {
    const { data } = await axios.get<Prescription[]>(`${API_BASE_URL}/prescriptions`, {
      params: { limit }
    });
    return data;
  },
  async exportToExcel(prescriptionId: string) {
    const { data } = await axios.get(`${API_BASE_URL}/prescriptions/${prescriptionId}/export/excel`, {
      responseType: "blob"
    });
    return data;
  },
  async exportToPDF(prescriptionId: string) {
    const { data } = await axios.get(`${API_BASE_URL}/prescriptions/${prescriptionId}/export/pdf`, {
      responseType: "blob"
    });
    return data;
  }
};
