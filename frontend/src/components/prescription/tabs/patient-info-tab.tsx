import { UseFormReturn } from "react-hook-form";
import { PrescriptionFormValues } from "@/lib/validation/prescription-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PatientInfoTabProps {
  form: UseFormReturn<PrescriptionFormValues>;
}

export const PatientInfoTab: React.FC<PatientInfoTabProps> = ({ form }) => {
  const {
    register,
    formState: { errors }
  } = form;

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-lg border border-border bg-background p-6 shadow-soft">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.name">
              Nome do paciente
            </label>
            <Input id="patient.name" {...register("patient.name")} />
            {errors.patient?.name && (
              <p className="text-xs text-destructive-foreground">{errors.patient.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.recordNumber">
              Número do prontuário
            </label>
            <Input id="patient.recordNumber" {...register("patient.recordNumber")} />
            {errors.patient?.recordNumber && (
              <p className="text-xs text-destructive-foreground">{errors.patient.recordNumber.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.age">
              Idade
            </label>
            <Input id="patient.age" type="number" min={0} {...register("patient.age", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.weight">
              Peso (kg)
            </label>
            <Input
              id="patient.weight"
              type="number"
              step="0.1"
              min={0}
              {...register("patient.weight", { valueAsNumber: true })}
            />
            {errors.patient?.weight && (
              <p className="text-xs text-destructive-foreground">{errors.patient.weight.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.bed">
              Leito
            </label>
            <Input id="patient.bed" {...register("patient.bed")} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.diagnosis">
              Diagnóstico principal
            </label>
            <Textarea id="patient.diagnosis" rows={3} {...register("patient.diagnosis")} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="patient.cids">
              CIDs relacionados (separe por vírgula)
            </label>
            <Textarea
              id="patient.cids"
              rows={3}
              placeholder="Ex: I10, E11"
              {...register("patient.cids", {
                setValueAs: (value: string) =>
                  value
                    ?.split(",")
                    .map((cid) => cid.trim())
                    .filter(Boolean) ?? []
              })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="patient.allergies">
            Alergias e contraindicações
          </label>
          <Textarea id="patient.allergies" rows={2} {...register("patient.allergies")} />
        </div>
      </section>
    </div>
  );
};
