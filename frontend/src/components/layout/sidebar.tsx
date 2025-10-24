import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Users, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", to: "/", icon: LayoutDashboard },
  { name: "Prescrições", to: "/prescricoes", icon: FileText },
  { name: "Pacientes", to: "/pacientes", icon: Users },
  { name: "Modelos", to: "/modelos", icon: Layers }
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden w-72 border-r border-border bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <span className="text-lg font-semibold text-primary-foreground">MediPoint Central</span>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent text-accent-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )
              }
              end={item.to === "/"}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
