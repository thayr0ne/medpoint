import { Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";

export const Topbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 shadow-soft">
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-base font-semibold">MediPoint Central</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition"
          aria-label="Alternar tema"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-3 rounded-full bg-card px-4 py-2 shadow-soft">
          <div className="text-sm">
            <p className="font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
          <button
            onClick={signOut}
            className="text-xs font-medium text-destructive-foreground hover:underline"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};
