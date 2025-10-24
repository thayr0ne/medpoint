import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-card">
          <div className="mx-auto max-w-7xl space-y-6 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
