import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routeConfig } from "./routes/config";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const routes = useRoutes(routeConfig);

  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center">Carregando...</div>}>
      {routes}
      <Toaster />
    </Suspense>
  );
}

export default App;
