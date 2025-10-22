import { useToastStore } from "@/shared/stores/toastStore";
import { cn } from "@/shared/utils/cn";
import {
  X,
  CheckCircle,
  AlertCircle,
  InfoIcon,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: InfoIcon,
};

const toastStyles = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};

export const Toaster = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type];

        return (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-2",
              toastStyles[toast.type],
              "min-w-[320px] max-w-md"
            )}
          >
            <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              {toast.title && <p className="font-medium">{toast.title}</p>}
              {toast.message && (
                <p className="text-sm opacity-90">{toast.message}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 h-6 w-6 hover:bg-black/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};
