import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PatientsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Pacientes</h1>
          <p className="text-sm text-muted-foreground">Gerencie admissões e censo hospitalar</p>
        </div>
        <Button>Novo paciente</Button>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Pesquisa</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="search">
              Buscar paciente
            </label>
            <Input id="search" placeholder="Nome ou prontuário" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground" htmlFor="specialty">
              Especialidade
            </label>
            <Input id="specialty" placeholder="Ex: Clínica Médica" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Censo hospitalar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Esta seção apresentará o mapa de leitos interativo e filtros de censo nas próximas iterações.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientsPage;
