import path from "path-browserify";
import { Prescription } from "@/types/prescription";

const DATA_DIR = "MediPoint-Data";

export interface FileSystemService {
  createPatientFolder: (recordNumber: string, patientName: string) => Promise<string>;
  createAdmissionFolder: (patientPath: string, admissionDate: string) => Promise<string>;
  savePrescription: (admissionPath: string, prescription: Prescription) => Promise<string>;
  saveJSON: (filePath: string, data: unknown) => Promise<void>;
  readJSON: <T>(filePath: string) => Promise<T>;
}

const buildPatientFolderName = (recordNumber: string, patientName: string) => {
  const sanitizedName = patientName.replace(/[^a-zA-Z0-9]/g, "-");
  return `${recordNumber}-${sanitizedName}`;
};

export const fileSystemService: FileSystemService = {
  async createPatientFolder(recordNumber, patientName) {
    const folderName = buildPatientFolderName(recordNumber, patientName);
    return path.join(DATA_DIR, "pacientes", folderName);
  },
  async createAdmissionFolder(patientPath, admissionDate) {
    return path.join(patientPath, `internacao-${admissionDate}`);
  },
  async savePrescription(admissionPath, prescription) {
    const timestamp = new Date().toISOString().replace(/:/g, "-").split(".")[0];
    const fileName = `prescricao-${timestamp}.xlsx`;
    return path.join(admissionPath, "prescricoes", fileName);
  },
  async saveJSON(filePath, data) {
    console.info("Persistência local não disponível no navegador", filePath, data);
  },
  async readJSON(filePath) {
    console.info("Leitura local não disponível no navegador", filePath);
    return Promise.resolve({}) as Promise<any>;
  }
};
