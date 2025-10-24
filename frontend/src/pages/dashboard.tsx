import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHighlights } from "@/components/dashboard/highlights";
import { RecentPatients } from "@/components/dashboard/recent-patients";
import { PendingAlerts } from "@/components/dashboard/pending-alerts";

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHighlights />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pacientes Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentPatients />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Pendências</CardTitle>
          </CardHeader>
          <CardContent>
            <PendingAlerts />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
