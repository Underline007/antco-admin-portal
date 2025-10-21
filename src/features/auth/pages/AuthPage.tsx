import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthStore } from "../stores/authStore";
import { useToast } from "@/shared/stores/toastStore";
import { cn } from "@/shared/utils/cn";

// Login validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

// Register validation schema
const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

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
      username: "",
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

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-auto">
      <div className="w-full max-w-6xl my-8 mx-4 sm:mx-6 lg:mx-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Antco Admin Portal
          </h2>
          <p className="mt-2 text-gray-600">
            {isLoginMode
              ? "Welcome back! Please login to your account"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Main Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
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
                <form
                  className="space-y-5"
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                >
                  {/* Username */}
                  <div>
                    <label
                      htmlFor="login-username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      {...loginForm.register("username")}
                      type="text"
                      id="login-username"
                      autoComplete="username"
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                        loginForm.formState.errors.username
                          ? "border-red-300"
                          : "border-gray-300"
                      )}
                      placeholder="Enter your username"
                    />
                    {loginForm.formState.errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {loginForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...loginForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        id="login-password"
                        autoComplete="current-password"
                        className={cn(
                          "w-full px-4 py-3 pr-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
                          loginForm.formState.errors.password
                            ? "border-red-300"
                            : "border-gray-300"
                        )}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        {...loginForm.register("rememberMe")}
                        type="checkbox"
                        id="rememberMe"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="ml-2 block text-sm text-gray-700 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white",
                      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                      "disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>
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
                <form
                  className="space-y-4"
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                >
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        {...registerForm.register("firstName")}
                        type="text"
                        id="firstName"
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                          registerForm.formState.errors.firstName
                            ? "border-red-300"
                            : "border-gray-300"
                        )}
                        placeholder="John"
                      />
                      {registerForm.formState.errors.firstName && (
                        <p className="mt-1 text-xs text-red-600">
                          {registerForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        {...registerForm.register("lastName")}
                        type="text"
                        id="lastName"
                        className={cn(
                          "w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                          registerForm.formState.errors.lastName
                            ? "border-red-300"
                            : "border-gray-300"
                        )}
                        placeholder="Doe"
                      />
                      {registerForm.formState.errors.lastName && (
                        <p className="mt-1 text-xs text-red-600">
                          {registerForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Username */}
                  <div>
                    <label
                      htmlFor="register-username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      {...registerForm.register("username")}
                      type="text"
                      id="register-username"
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                        registerForm.formState.errors.username
                          ? "border-red-300"
                          : "border-gray-300"
                      )}
                      placeholder="johndoe"
                    />
                    {registerForm.formState.errors.username && (
                      <p className="mt-1 text-sm text-red-600">
                        {registerForm.formState.errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      {...registerForm.register("email")}
                      type="email"
                      id="email"
                      className={cn(
                        "w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                        registerForm.formState.errors.email
                          ? "border-red-300"
                          : "border-gray-300"
                      )}
                      placeholder="john@example.com"
                    />
                    {registerForm.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {registerForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="register-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerForm.register("password")}
                        type={showPassword ? "text" : "password"}
                        id="register-password"
                        className={cn(
                          "w-full px-4 py-3 pr-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                          registerForm.formState.errors.password
                            ? "border-red-300"
                            : "border-gray-300"
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {registerForm.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {registerForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        {...registerForm.register("confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className={cn(
                          "w-full px-4 py-3 pr-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all",
                          registerForm.formState.errors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-300"
                        )}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {registerForm.formState.errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {registerForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white",
                      "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
                      "disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    )}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sliding Overlay Panel */}
            <div
              className={cn(
                "absolute top-0 h-full w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 transition-all duration-700 ease-in-out transform",
                isLoginMode ? "right-0 translate-x-0" : "right-1/2 translate-x-0"
              )}
            >
              <div className="h-full flex items-center justify-center p-12 text-white">
                <div className="text-center max-w-md">
                  {isLoginMode ? (
                    <>
                      <h3 className="text-3xl font-bold mb-4">
                        Hello, Friend!
                      </h3>
                      <p className="text-blue-100 mb-8">
                        Enter your personal details and start your journey with us
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsLoginMode(false)}
                        className="px-8 py-3 border-2 border-white rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all duration-300"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-3xl font-bold mb-4">
                        Welcome Back!
                      </h3>
                      <p className="text-blue-100 mb-8">
                        To keep connected with us please login with your personal info
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsLoginMode(true)}
                        className="px-8 py-3 border-2 border-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-all duration-300"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>© 2024 Antco Admin Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
