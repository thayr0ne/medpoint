export type PrescriptionCategory =
  | "medication"
  | "antimicrobial"
  | "vasoactive"
  | "sedation"
  | "hydration"
  | "diet"
  | "care";

export interface PrescriptionItemBase {
  id: string;
  category: PrescriptionCategory;
  medication: string;
  route?: string;
  notes?: string;
}

export interface MedicationItem extends PrescriptionItemBase {
  category: "medication";
  dose: string;
  frequency: string;
  duration?: string;
}

export interface AntimicrobialItem extends PrescriptionItemBase {
  category: "antimicrobial";
  dose: string;
  diluent?: string;
  diluentVolume?: string;
  frequency: string;
  duration: string;
  infectionSite?: string;
  justification?: string;
  startDate: string;
}

export interface VasoactiveItem extends PrescriptionItemBase {
  category: "vasoactive" | "sedation";
  dose: string;
  doseUnit: string;
  patientWeight: number;
  solution: string;
  solutionVolume: number;
  infusionRate: number;
  concentration?: number;
}

export interface HydrationItem extends PrescriptionItemBase {
  category: "hydration";
  solution: string;
  volume: number;
  infusionRate: number;
  additives?: string;
  startTime?: string;
}

export interface DietItem extends PrescriptionItemBase {
  category: "diet";
  dietType: string;
  dietDetails: string;
  volume?: string;
  frequency?: string;
}

export interface CareItem extends PrescriptionItemBase {
  category: "care";
  careType: string;
  instructions: string;
  frequency?: string;
}

export type PrescriptionItem =
  | MedicationItem
  | AntimicrobialItem
  | VasoactiveItem
  | HydrationItem
  | DietItem
  | CareItem;

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  recordNumber: string;
  date: string;
  prescriberId: string;
  prescriberName: string;
  prescriberCRM: string;
  items: PrescriptionItem[];
  diagnosis?: string;
  cids?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionModel {
  id: string;
  name: string;
  description?: string;
  cids: string[];
  isPublic: boolean;
  category?: string;
  createdAt: string;
  createdBy: string;
  createdByName: string;
  uses: number;
  items: PrescriptionItem[];
}
