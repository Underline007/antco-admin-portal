import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../auth/api/authApi";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Lock, Eye, EyeOff, Check } from "lucide-react";

export default function SettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => authApi.changePassword(data),
    onSuccess: () => {
      setPasswordSuccess(true);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");
      setTimeout(() => setPasswordSuccess(false), 5000);
    },
    onError: (error: any) => {
      setPasswordError(
        error.response?.data?.message ||
          "Failed to change password. Please try again."
      );
      setPasswordSuccess(false);
    },
  });

  const validatePassword = () => {
    if (!passwordForm.currentPassword) {
      setPasswordError("Current password is required");
      return false;
    }
    if (!passwordForm.newPassword) {
      setPasswordError("New password is required");
      return false;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return false;
    }
    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError("New password must be different from current password");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword()) {
      changePasswordMutation.mutate(passwordForm);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Change Password Card */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-[#2563eb] flex items-center justify-center">
              <Lock className="h-5 w-5 text-[#2563eb]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Change Password
              </h2>
              <p className="text-sm text-gray-600">
                Update your password to keep your account secure
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                  placeholder="Enter new password (min 6 characters)"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{passwordError}</p>
              </div>
            )}

            {/* Success Message */}
            {passwordSuccess && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center text-sm text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  Password changed successfully!
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4 border-t">
              <Button
                type="submit"
                disabled={changePasswordMutation.isPending}
                className="flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                {changePasswordMutation.isPending
                  ? "Changing Password..."
                  : "Change Password"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setPasswordError("");
                  setPasswordSuccess(false);
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>

        {/* Password Requirements Card */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Password Requirements
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              </div>
              <span>Minimum 6 characters long</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              </div>
              <span>Should be different from your current password</span>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              </div>
              <span>New password and confirm password must match</span>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-[#2563eb] rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800">
              <strong>Tip:</strong> Use a combination of letters, numbers, and
              special characters for a stronger password.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
