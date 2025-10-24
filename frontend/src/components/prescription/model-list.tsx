import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockModels = [
  {
    id: "1",
    name: "Pneumonia comunitária",
    cids: ["J18"],
    specialty: "Clínica Médica",
    visibility: "Público",
    uses: 42
  },
  {
    id: "2",
    name: "Sepse abdominal",
    cids: ["A41.9", "K65.0"],
    specialty: "UTI",
    visibility: "Público",
    uses: 18
  },
  {
    id: "3",
    name: "Modelo particular de UTI",
    cids: ["Z99.2"],
    specialty: "Nefrologia",
    visibility: "Privado",
    uses: 5
  }
];

export const PrescriptionModelList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modelos disponíveis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockModels.map((model) => (
          <div key={model.id} className="rounded-lg border border-border bg-background/70 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{model.name}</p>
                <p className="text-xs text-muted-foreground">CIDs: {model.cids.join(", ")}</p>
                <p className="text-xs text-muted-foreground">Especialidade: {model.specialty}</p>
              </div>
              <div className="text-right text-xs text-muted-foreground">
                <p>{model.visibility}</p>
                <p>{model.uses} utilizações</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
