import { QueryProvider } from './app/provider/QueryProvider';
import { AppRouter } from "@/app/routes";
import { Toaster } from "@/shared/components/ui/Toaster";

export const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
      <Toaster />
    </QueryProvider>
  );
};
