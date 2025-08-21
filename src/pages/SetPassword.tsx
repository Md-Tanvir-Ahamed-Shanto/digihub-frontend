import { ArrowLeft, Globe, Handshake } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";

const SetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
        console.log("partner", role)

      setIsLoading(true);
      if (role === "client") {
        const response = await axiosInstance.post(
          `/client/set-password?token=${token}`,
          {
            password,
          }
        );
        if (response.data) {
          toast({
            title: "Success!",
            description:
              "Your password has been set successfully. You can now log in.",
          });
          navigate("/client-login");
        }
      } else if (role === "partner") {
        console.log("partner")
        const response = await axiosInstance.post(
          `/partner/set-password?token=${token}`,
          {
            password,
          }
        );
        if (response.data) {
          toast({
            title: "Success!",
            description:
              "Your password has been set successfully. You can now log in.",
          });
          navigate("/partner-login");
        }
      }
    } catch (error: any) {
      console.error("Error setting password:", error);
      if (error.response?.status === 404) {
        navigate("/set-password-failed?reason=invalid_or_expired");
      } else {
        navigate("/set-password-failed?reason=server_error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    navigate("/set-password-failed?reason=no_token");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-gray-50 to-brand-primary/5">
      <div className="bg-white/95 backdrop-blur-sm border-b border-brand-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="w-8 h-8 text-brand-primary" />
                <Handshake className="w-4 h-4 text-brand-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-indigo-500">
                  DIGIHUB AUST
                </span>
                <span className="text-sm font-light text-brand-gray-600 -mt-1">
                  Digital Solutions Hub
                </span>
              </div>
            </Link>

            <Link
              to="/"
              className="flex items-center text-brand-gray-700 hover:text-brand-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="border-brand-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-brand-primary">
                Set Your Password
              </CardTitle>
              <CardDescription>
                Please set a secure password for your account to complete the
                activation process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="border-brand-gray-300 focus:border-brand-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="border-brand-gray-300 focus:border-brand-primary"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Setting Password..." : "Set Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
