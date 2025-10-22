import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/shared/stores/toastStore";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/authSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const toast = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {

      // TODO: Implement forgot password API call
      console.log("Sending password reset link to:", data.email);
      setIsSuccess(true);
      toast.success("Password reset link sent to your email!");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send reset link. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Back to login link */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-8 group"
        >
          <Link to="/auth">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to login
          </Link>
        </Button>

        {/* Card */}
        <Card className="rounded-2xl shadow-xl p-8 sm:p-10">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg mb-4">
                  <Mail className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Forgot Password?
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                  No worries! Enter your email address and we'll send you a link
                  to reset your password.
                </p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Input */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="email"
                              autoComplete="email"
                              placeholder="Enter your email address"
                              className="pl-11"
                            />
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Sending reset link...
                      </>
                    ) : (
                      <>
                        <Mail className="h-5 w-5 mr-2" />
                        Send Reset Link
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Helper Text */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    to="/auth"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          ) : (
            // Success State
            <div className="text-center py-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-2">
                We've sent a password reset link to:
              </p>
              <p className="text-sm font-medium text-gray-900 mb-6">
                {form.getValues("email")}
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Didn't receive the email?</strong>
                  <br />
                  Check your spam folder or{" "}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => {
                      setIsSuccess(false);
                      toast.success("You can try again now");
                    }}
                    className="h-auto p-0 underline font-medium text-sm"
                  >
                    try again
                  </Button>
                </p>
              </div>
              <Button asChild>
                <Link to="/auth">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@antco.com"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
