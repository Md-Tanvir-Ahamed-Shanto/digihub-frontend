import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Mail,
  Shield,
  Database,
  Save,
  TestTube,
  CheckCircle,
  AlertCircle,
  Download,
  Globe,
  Upload,
  Image,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/api/axios";

const AdminSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [adminCredentials, setAdminCredentials] = useState({
    email: user?.email,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateCredentials = async () => {
    if (!adminCredentials.currentPassword || !adminCredentials.newPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    const response = await axiosInstance.post("/admin/update-credentials", {
      email: adminCredentials.email,
      currentPassword: adminCredentials.currentPassword,
      password: adminCredentials.newPassword,
    });

    if (response.status === 200) {
      toast({
        title: "Credentials Updated",
        description: `${response.data.message}`,
      });
      setAdminCredentials((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      return;
    } else {
      toast({
        title: "Error",
        description: `${response.data.message}`,
      });
      return;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          System Settings
        </h2>
      </div>

      <Tabs defaultValue="credentials" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="credentials" className="text-xs sm:text-sm">
            Admin Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Admin Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={adminCredentials.email}
                  onChange={(e) =>
                    setAdminCredentials((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="admin@DIGIHUB AUST.com"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">
                  Change Password
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="current-password">Current Password *</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={adminCredentials.currentPassword}
                      onChange={(e) =>
                        setAdminCredentials((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-password">New Password *</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={adminCredentials.newPassword}
                        onChange={(e) =>
                          setAdminCredentials((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">
                        Confirm New Password *
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={adminCredentials.confirmPassword}
                        onChange={(e) =>
                          setAdminCredentials((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleUpdateCredentials} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Update Credentials
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
