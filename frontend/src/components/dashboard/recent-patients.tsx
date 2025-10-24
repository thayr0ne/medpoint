import { formatDate } from "@/lib/utils";

const patients = [
  { name: "Ana Souza", record: "000123", admission: "2025-05-01", bed: "3B - 12" },
  { name: "Carlos Pereira", record: "000456", admission: "2025-04-30", bed: "UTI - 04" },
  { name: "Juliana Ramos", record: "000789", admission: "2025-04-29", bed: "2A - 07" }
];

export const RecentPatients: React.FC = () => {
  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.record}
          className="flex items-center justify-between rounded-lg border border-border bg-background/80 p-4"
        >
          <div>
            <p className="text-sm font-semibold text-foreground">{patient.name}</p>
            <p className="text-xs text-muted-foreground">Prontuário {patient.record}</p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>Leito {patient.bed}</p>
            <p>Admitido em {formatDate(patient.admission)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
