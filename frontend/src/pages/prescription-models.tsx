import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PrescriptionModelList } from "@/components/prescription/model-list";
import { PrescriptionModelActions } from "@/components/prescription/model-actions";

const PrescriptionModelsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Modelos de Prescrição</h1>
          <p className="text-sm text-muted-foreground">
            Centralize modelos institucionais e particulares para agilizar o cuidado.
          </p>
        </div>
        <Button>Criar modelo</Button>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Buscar modelos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="model-name">
              Nome do modelo
            </label>
            <Input id="model-name" placeholder="Ex: Pneumonia comunitária" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="model-cid">
              CID-10
            </label>
            <Input id="model-cid" placeholder="Ex: J18" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="model-specialty">
              Especialidade
            </label>
            <Input id="model-specialty" placeholder="Ex: Infectologia" />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <PrescriptionModelList />
        <PrescriptionModelActions />
      </div>
    </div>
  );
};

export default PrescriptionModelsPage;
