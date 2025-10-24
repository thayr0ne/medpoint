import { AlertTriangle } from "lucide-react";

const alerts = [
  {
    title: "Resultado crítico",
    description: "Potássio sérico acima de 6 mEq/L - Paciente 000456",
    level: "alta"
  },
  {
    title: "Antimicrobiano sem justificativa",
    description: "Avaliar justificativa para meropenem - Paciente 000789",
    level: "media"
  },
  {
    title: "Parecer pendente",
    description: "Cardiologia para paciente 000321",
    level: "baixa"
  }
] as const;

const levelBadge: Record<string, string> = {
  alta: "bg-destructive text-destructive-foreground",
  media: "bg-secondary text-secondary-foreground",
  baixa: "bg-accent text-accent-foreground"
};

export const PendingAlerts: React.FC = () => {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.title} className="rounded-lg border border-border bg-background/80 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <span className="rounded-full bg-accent p-2 text-accent-foreground">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.description}</p>
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${levelBadge[alert.level]}`}>
              Prioridade {alert.level}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
