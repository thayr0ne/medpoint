import { z } from "zod";

const prescriptionItemBaseSchema = z.object({
  id: z.string(),
  category: z.enum(["medication", "antimicrobial", "vasoactive", "sedation", "hydration", "diet", "care"]),
  medication: z.string().min(1, "Medicamento é obrigatório"),
  route: z.string().optional(),
  notes: z.string().optional()
});

const medicationSchema = prescriptionItemBaseSchema.extend({
  category: z.literal("medication"),
  dose: z.string().min(1, "Dose é obrigatória"),
  frequency: z.string().min(1, "Frequência é obrigatória"),
  duration: z.string().optional()
});

const antimicrobialSchema = prescriptionItemBaseSchema.extend({
  category: z.literal("antimicrobial"),
  dose: z.string().min(1, "Dose é obrigatória"),
  frequency: z.string().min(1, "Frequência é obrigatória"),
  duration: z.string().min(1, "Duração é obrigatória"),
  infectionSite: z.string().optional(),
  justification: z.string().optional(),
  diluent: z.string().optional(),
  diluentVolume: z.string().optional(),
  startDate: z.string().min(1, "Data de início é obrigatória")
});

const vasoactiveSchema = prescriptionItemBaseSchema.extend({
  category: z.union([z.literal("vasoactive"), z.literal("sedation")]),
  dose: z.string().min(1, "Dose é obrigatória"),
  doseUnit: z.string().min(1, "Unidade é obrigatória"),
  patientWeight: z.number().positive("Peso deve ser positivo"),
  solution: z.string().min(1, "Solução é obrigatória"),
  solutionVolume: z.number().positive("Volume deve ser positivo"),
  infusionRate: z.number().positive("Taxa deve ser positiva"),
  concentration: z.number().positive().optional()
});

const hydrationSchema = prescriptionItemBaseSchema.extend({
  category: z.literal("hydration"),
  solution: z.string().min(1, "Solução é obrigatória"),
  volume: z.number().positive("Volume deve ser positivo"),
  infusionRate: z.number().positive("Taxa deve ser positiva"),
  additives: z.string().optional(),
  startTime: z.string().optional()
});

const dietSchema = prescriptionItemBaseSchema.extend({
  category: z.literal("diet"),
  dietType: z.string().min(1, "Tipo de dieta é obrigatório"),
  dietDetails: z.string().min(1, "Detalhes são obrigatórios"),
  volume: z.string().optional(),
  frequency: z.string().optional()
});

const careSchema = prescriptionItemBaseSchema.extend({
  category: z.literal("care"),
  careType: z.string().min(1, "Tipo de cuidado é obrigatório"),
  instructions: z.string().min(1, "Instruções são obrigatórias"),
  frequency: z.string().optional()
});

export const prescriptionSchema = z.object({
  patient: z.object({
    name: z.string().min(1, "Nome do paciente é obrigatório"),
    recordNumber: z.string().min(1, "Número do prontuário é obrigatório"),
    age: z.number().optional(),
    weight: z.number().positive("Peso deve ser positivo").optional(),
    bed: z.string().optional(),
    diagnosis: z.string().optional(),
    cids: z.array(z.string()).optional(),
    allergies: z.string().optional()
  }),
  prescription: z
    .array(
      z.union([medicationSchema, antimicrobialSchema, vasoactiveSchema, hydrationSchema, dietSchema, careSchema])
    )
    .optional(),
  temporary: z.record(z.any()).optional()
});

export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;
