import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { PrescriptionItem } from "@/types/prescription";
import { PrescriptionFormValues } from "@/lib/validation/prescription-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PrescriptionItemFormProps {
  form: UseFormReturn<PrescriptionFormValues>;
  category: string;
  onAddItem: (item: PrescriptionItem) => void;
  onUpdateItem: (item: PrescriptionItem) => void;
  editingItem?: PrescriptionItem;
  isEditing: boolean;
}

const FieldLabel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <label className="text-sm font-medium text-foreground">{children}</label>
);

export const PrescriptionItemForm: React.FC<PrescriptionItemFormProps> = ({
  form,
  category,
  onAddItem,
  onUpdateItem,
  editingItem,
  isEditing
}) => {
  const { register, reset, setValue } = form;

  useEffect(() => {
    if (editingItem) {
      Object.entries(editingItem).forEach(([key, value]) => {
        setValue(`temporary.${key}` as const, value as never);
      });
    } else {
      reset((prev) => ({ ...prev, temporary: {} }));
    }
  }, [editingItem, reset, setValue]);

  const temporary = form.watch("temporary") as Record<string, unknown>;

  const handleSubmit = () => {
    const baseItem: PrescriptionItem = {
      id: (editingItem?.id ?? crypto.randomUUID()) as string,
      category: category as PrescriptionItem["category"],
      medication: String(temporary?.medication ?? ""),
      route: (temporary?.route as string) || undefined,
      notes: (temporary?.notes as string) || undefined
    } as PrescriptionItem;

    let payload: PrescriptionItem = baseItem;

    if (category === "medication") {
      payload = {
        ...baseItem,
        dose: String(temporary?.dose ?? ""),
        frequency: String(temporary?.frequency ?? ""),
        duration: (temporary?.duration as string) || undefined
      } as PrescriptionItem;
    }

    if (category === "antimicrobial") {
      payload = {
        ...baseItem,
        dose: String(temporary?.dose ?? ""),
        frequency: String(temporary?.frequency ?? ""),
        duration: String(temporary?.duration ?? ""),
        infectionSite: (temporary?.infectionSite as string) || undefined,
        justification: (temporary?.justification as string) || undefined,
        diluent: (temporary?.diluent as string) || undefined,
        diluentVolume: (temporary?.diluentVolume as string) || undefined,
        startDate: String(temporary?.startDate ?? "")
      } as PrescriptionItem;
    }

    if (category === "hydration") {
      payload = {
        ...baseItem,
        solution: String(temporary?.solution ?? ""),
        volume: Number(temporary?.volume ?? 0),
        infusionRate: Number(temporary?.infusionRate ?? 0),
        additives: (temporary?.additives as string) || undefined,
        startTime: (temporary?.startTime as string) || undefined
      } as PrescriptionItem;
    }

    if (category === "diet") {
      payload = {
        ...baseItem,
        dietType: String(temporary?.dietType ?? ""),
        dietDetails: String(temporary?.dietDetails ?? ""),
        volume: (temporary?.volume as string) || undefined,
        frequency: (temporary?.frequency as string) || undefined
      } as PrescriptionItem;
    }

    if (category === "care") {
      payload = {
        ...baseItem,
        careType: String(temporary?.careType ?? ""),
        instructions: String(temporary?.instructions ?? ""),
        frequency: (temporary?.frequency as string) || undefined
      } as PrescriptionItem;
    }

    if (category === "vasoactive" || category === "sedation") {
      payload = {
        ...baseItem,
        dose: String(temporary?.dose ?? ""),
        doseUnit: String(temporary?.doseUnit ?? ""),
        patientWeight: Number(temporary?.patientWeight ?? 0),
        solution: String(temporary?.solution ?? ""),
        solutionVolume: Number(temporary?.solutionVolume ?? 0),
        infusionRate: Number(temporary?.infusionRate ?? 0),
        concentration: temporary?.concentration ? Number(temporary?.concentration) : undefined
      } as PrescriptionItem;
    }

    if (isEditing) {
      onUpdateItem(payload);
    } else {
      onAddItem(payload);
    }
    reset((prev) => ({ ...prev, temporary: {} }));
  };

  return (
    <section className="grid gap-4 rounded-lg border border-border bg-background p-6 shadow-soft">
      <header>
        <h2 className="text-lg font-semibold text-foreground">Detalhes do item</h2>
        <p className="text-xs text-muted-foreground">Preencha os campos específicos da categoria selecionada</p>
      </header>
      <div className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Item</FieldLabel>
            <Input {...register("temporary.medication" as const)} />
          </div>
          <div className="space-y-2">
            <FieldLabel>Via</FieldLabel>
            <Input {...register("temporary.route" as const)} />
          </div>
        </div>

        {category === "medication" && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <FieldLabel>Dose</FieldLabel>
              <Input {...register("temporary.dose" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Frequência</FieldLabel>
              <Input {...register("temporary.frequency" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Duração</FieldLabel>
              <Input {...register("temporary.duration" as const)} />
            </div>
          </div>
        )}

        {category === "antimicrobial" && (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <FieldLabel>Dose</FieldLabel>
                <Input {...register("temporary.dose" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Frequência</FieldLabel>
                <Input {...register("temporary.frequency" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Duração</FieldLabel>
                <Input {...register("temporary.duration" as const)} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel>Diluente</FieldLabel>
                <Input {...register("temporary.diluent" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Volume do diluente</FieldLabel>
                <Input {...register("temporary.diluentVolume" as const)} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel>Data de início</FieldLabel>
                <Input type="date" {...register("temporary.startDate" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Sítio de infecção</FieldLabel>
                <Input {...register("temporary.infectionSite" as const)} />
              </div>
            </div>
            <div className="space-y-2">
              <FieldLabel>Justificativa</FieldLabel>
              <Textarea rows={2} {...register("temporary.justification" as const)} />
            </div>
          </div>
        )}

        {(category === "vasoactive" || category === "sedation") && (
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel>Dose</FieldLabel>
                <Input {...register("temporary.dose" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Unidade</FieldLabel>
                <Input {...register("temporary.doseUnit" as const)} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <FieldLabel>Peso (kg)</FieldLabel>
                <Input type="number" step="0.1" {...register("temporary.patientWeight" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Solução</FieldLabel>
                <Input {...register("temporary.solution" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Volume (ml)</FieldLabel>
                <Input type="number" {...register("temporary.solutionVolume" as const)} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel>Taxa (ml/h)</FieldLabel>
                <Input type="number" {...register("temporary.infusionRate" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Concentração</FieldLabel>
                <Input type="number" step="0.1" {...register("temporary.concentration" as const)} />
              </div>
            </div>
          </div>
        )}

        {category === "hydration" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel>Solução</FieldLabel>
              <Input {...register("temporary.solution" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Volume total (ml)</FieldLabel>
              <Input type="number" {...register("temporary.volume" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Taxa (ml/h)</FieldLabel>
              <Input type="number" {...register("temporary.infusionRate" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Aditivos</FieldLabel>
              <Input {...register("temporary.additives" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Horário de início</FieldLabel>
              <Input type="time" {...register("temporary.startTime" as const)} />
            </div>
          </div>
        )}

        {category === "diet" && (
          <div className="grid gap-4">
            <div className="space-y-2">
              <FieldLabel>Tipo de dieta</FieldLabel>
              <Input {...register("temporary.dietType" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Detalhes</FieldLabel>
              <Textarea rows={3} {...register("temporary.dietDetails" as const)} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel>Volume</FieldLabel>
                <Input {...register("temporary.volume" as const)} />
              </div>
              <div className="space-y-2">
                <FieldLabel>Frequência</FieldLabel>
                <Input {...register("temporary.frequency" as const)} />
              </div>
            </div>
          </div>
        )}

        {category === "care" && (
          <div className="grid gap-4">
            <div className="space-y-2">
              <FieldLabel>Tipo de cuidado</FieldLabel>
              <Input {...register("temporary.careType" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Instruções</FieldLabel>
              <Textarea rows={3} {...register("temporary.instructions" as const)} />
            </div>
            <div className="space-y-2">
              <FieldLabel>Frequência</FieldLabel>
              <Input {...register("temporary.frequency" as const)} />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <FieldLabel>Observações</FieldLabel>
          <Textarea rows={3} {...register("temporary.notes" as const)} />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        {isEditing && (
          <Button type="button" variant="ghost" onClick={() => reset((prev) => ({ ...prev, temporary: {} }))}>
            Cancelar
          </Button>
        )}
        <Button type="button" onClick={handleSubmit}>
          {isEditing ? "Atualizar item" : "Adicionar item"}
        </Button>
      </div>
    </section>
  );
};
