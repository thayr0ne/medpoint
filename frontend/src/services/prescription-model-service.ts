import axios from "axios";
import { PrescriptionModel } from "@/types/prescription";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

export const prescriptionModelService = {
  async create(model: PrescriptionModel) {
    const { data } = await axios.post<PrescriptionModel>(`${API_BASE_URL}/prescription-models`, model);
    return data;
  },
  async getById(id: string) {
    const { data } = await axios.get<PrescriptionModel>(`${API_BASE_URL}/prescription-models/${id}`);
    return data;
  },
  async update(id: string, payload: Partial<PrescriptionModel>) {
    const { data } = await axios.put<PrescriptionModel>(`${API_BASE_URL}/prescription-models/${id}`, payload);
    return data;
  },
  async remove(id: string) {
    await axios.delete(`${API_BASE_URL}/prescription-models/${id}`);
  },
  async getPublicModels() {
    const { data } = await axios.get<PrescriptionModel[]>(`${API_BASE_URL}/prescription-models/public`);
    return data;
  },
  async getUserModels(userId: string) {
    const { data } = await axios.get<PrescriptionModel[]>(`${API_BASE_URL}/prescription-models/user/${userId}`);
    return data;
  },
  async searchByCID(cid: string) {
    const { data } = await axios.get<PrescriptionModel[]>(`${API_BASE_URL}/prescription-models`, {
      params: { cid }
    });
    return data;
  },
  async searchByName(name: string) {
    const { data } = await axios.get<PrescriptionModel[]>(`${API_BASE_URL}/prescription-models`, {
      params: { name }
    });
    return data;
  },
  async incrementUseCount(modelId: string) {
    await axios.post(`${API_BASE_URL}/prescription-models/${modelId}/increment`);
  }
};
