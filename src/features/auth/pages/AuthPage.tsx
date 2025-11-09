import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useToast } from "@/shared/stores/toastStore";
import { cn } from "@/shared/utils/cn";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
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
import { Label } from "@/components/ui/label";

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();
  const toast = useToast();

  const from = location.state?.from?.pathname || "/dashboard";

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Login failed. Please try again.";
      toast.error(message);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Implement register API call
      console.log("Register data:", data);
      toast.success("Registration successful! Please login.");
      setIsLoginMode(true);
      registerForm.reset();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.";
      toast.error(message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Implement Google OAuth flow
      // window.location.href = `${API_URL}/auth/google`;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Google login failed";
      toast.error(message);
  }};


  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2563eb] via-white to-[#1851c1] overflow-auto">
      <div className="w-full max-w-6xl my-8 mx-4 sm:mx-6 lg:mx-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg">
            <img
              src="svgs/logo_icon.svg"
              alt="Antco Logo"
              className="h-12 w-12"
            />
          </div>
          <h2 className="mt-6 text-4xl font-bold text-primary">
            Antco SSO Login
          </h2>
          <p className="mt-2 text-gray-600">
            {isLoginMode
              ? "Welcome back! Please login to your account"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Main Container */}
        <Card className="relative rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex min-h-[600px]">
            {/* Login Section */}
            <div
              className={cn(
                "w-1/2 p-12 transition-all duration-700 ease-in-out",
                !isLoginMode && "opacity-0 pointer-events-none"
              )}
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Sign In
                </h3>
                <Form {...loginForm}>
                  <form
                    className="space-y-5"
                    onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  >
                    {/* Email */}
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              autoComplete="email"
                              placeholder="Enter your email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between">
                      <FormField
                        control={loginForm.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              checked={field.value}
                              onChange={field.onChange}
                              className="h-4 w-4 text-[#2563eb] focus:ring-[#3b82f6] border-gray-300 rounded cursor-pointer"
                            />
                            <Label
                              htmlFor="rememberMe"
                              className="ml-2 text-sm cursor-pointer"
                            >
                              Remember me
                            </Label>
                          </div>
                        )}
                      />
                      <Link
                        to="/auth/forgot-password"
                        className="text-sm text-[#2563eb] hover:text-[#3b82f6] font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5 mr-2" />
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-950">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    {/* Google Login Button */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        handleGoogleLogin();
                        toast.error("Google login not implemented yet");
                      }}
                      className="w-full border-2 text-white"
                    >
                      <img
                        src="/svgs/google.svg"
                        alt="Google"
                        className="h-5 w-5 mr-2 "
                      />
                      Continue with Google
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Register Section */}
            <div
              className={cn(
                "w-1/2 p-12 transition-all duration-700 ease-in-out",
                isLoginMode && "opacity-0 pointer-events-none"
              )}
            >
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Create Account
                </h3>
                <Form {...registerForm}>
                  <form
                    className="space-y-4"
                    onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  >
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="John"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder="Doe" />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Username */}
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="johnsiu"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="abc@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Confirm Password */}
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-sm"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
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
                          Creating account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Sliding Overlay Panel */}
            <div
              className={cn(
                "absolute top-0 h-full w-1/2 bg-primary transition-all duration-700 ease-in-out transform",
                isLoginMode
                  ? "right-0 translate-x-0"
                  : "right-1/2 translate-x-0"
              )}
            >
              <div className="h-full flex items-center justify-center p-12 text-primary-foreground">
                <div className="text-center max-w-md">
                  {isLoginMode ? (
                    <>
                      <h3 className="text-3xl font-bold mb-4">
                        Hello, Friend!
                      </h3>
                      <p className="text-primary-foreground/90 mb-8">
                        Enter your personal details and start your journey with
                        us
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsLoginMode(false)}
                        className="px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      >
                        Sign Up
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                      <p className="text-primary-foreground/90 mb-8">
                        To keep connected with us please login with your
                        personal info
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsLoginMode(true)}
                        className="px-8 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                      >
                        Sign In
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>© 2025 Antco SSO Login. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
