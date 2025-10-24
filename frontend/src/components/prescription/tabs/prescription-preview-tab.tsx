import { UseFormReturn } from "react-hook-form";
import { PrescriptionFormValues } from "@/lib/validation/prescription-schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrescriptionItem } from "@/types/prescription";

const groupByCategory = (items: PrescriptionItem[]) => {
  return items.reduce<Record<string, PrescriptionItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
};

const categoryTitle: Record<string, string> = {
  medication: "Medicamentos",
  antimicrobial: "Antimicrobianos",
  vasoactive: "Drogas vasoativas",
  sedation: "Sedação",
  hydration: "Hidratação",
  diet: "Dietas",
  care: "Cuidados gerais"
};

interface PrescriptionPreviewTabProps {
  form: UseFormReturn<PrescriptionFormValues>;
}

export const PrescriptionPreviewTab: React.FC<PrescriptionPreviewTabProps> = ({ form }) => {
  const patient = form.watch("patient");
  const items = form.watch("prescription") ?? [];
  const grouped = groupByCategory(items);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-background p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Paciente</p>
            <p className="text-sm font-medium text-foreground">{patient?.name || "Não informado"}</p>
            <p className="text-xs text-muted-foreground">Prontuário {patient?.recordNumber || "-"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Internação</p>
            <p className="text-sm text-foreground">Leito {patient?.bed || "-"}</p>
            <p className="text-xs text-muted-foreground">Peso {patient?.weight ? `${patient.weight} kg` : "-"}</p>
          </div>
        </div>
        {patient?.allergies && (
          <div className="mt-6 rounded-lg border border-destructive bg-destructive/30 p-4">
            <p className="text-xs font-semibold uppercase text-destructive-foreground">Alergias</p>
            <p className="text-sm text-destructive-foreground">{patient.allergies}</p>
          </div>
        )}
      </section>

      {Object.entries(grouped).map(([category, categoryItems]) => (
        <Card key={category} className="border border-border/80">
          <CardHeader className="bg-accent/60">
            <CardTitle className="text-sm font-semibold text-accent-foreground">
              {categoryTitle[category] ?? category}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-border bg-background/80 p-3">
                <p className="text-sm font-semibold text-foreground">{item.medication}</p>
                {"dose" in item && item.dose && (
                  <p className="text-xs text-muted-foreground">Dose: {item.dose}</p>
                )}
                {item.route && <p className="text-xs text-muted-foreground">Via: {item.route}</p>}
                {item.notes && <p className="text-xs text-muted-foreground">Observações: {item.notes}</p>}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
