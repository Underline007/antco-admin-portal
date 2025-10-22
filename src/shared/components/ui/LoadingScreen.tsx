import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center pt-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
};
