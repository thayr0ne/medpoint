import { Outlet } from "react-router-dom";

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Outlet />
    </div>
  );
};
