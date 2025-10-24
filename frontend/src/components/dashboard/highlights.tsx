import { Activity, HeartPulse, Hospital, Stethoscope } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    name: "Ocupação Geral",
    value: "82%",
    description: "Taxa média das últimas 24h",
    icon: Hospital
  },
  {
    name: "Altas Previstas",
    value: "12",
    description: "Próximas 24h",
    icon: Stethoscope
  },
  {
    name: "Pacientes Críticos",
    value: "5",
    description: "Em ventilação mecânica",
    icon: HeartPulse
  },
  {
    name: "Exames Pendentes",
    value: "18",
    description: "Resultados aguardando revisão",
    icon: Activity
  }
];

export const DashboardHighlights: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {highlights.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.name} className="border border-border bg-card/60">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{item.name}</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <span className="rounded-full bg-accent p-3 text-accent-foreground shadow-soft">
                <Icon className="h-6 w-6" />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
