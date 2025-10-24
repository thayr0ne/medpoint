import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const PrescriptionModelActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">Aplicar modelo selecionado</Button>
        <Button variant="secondary" className="w-full">
          Salvar prescrição atual como modelo
        </Button>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground" htmlFor="model-notes">
            Notas sobre o modelo
          </label>
          <Textarea id="model-notes" rows={4} placeholder="Descrição detalhada e orientações" />
        </div>
      </CardContent>
    </Card>
  );
};
