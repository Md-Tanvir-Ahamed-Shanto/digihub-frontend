import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Image
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const { toast } = useToast();
  const [smtpSettings, setSmtpSettings] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: 'admin@dghub.com',
    password: '',
    encryption: 'TLS'
  });
  
  const [adminCredentials, setAdminCredentials] = useState({
    email: 'admin@dghub.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [siteSettings, setSiteSettings] = useState({
    title: 'DGHUB',
    tagline: 'Your Digital Growth Hub',
    logo: '',
    favicon: ''
  });

  const [backupStatus, setBackupStatus] = useState('idle'); // idle, creating, completed, error

  const handleSaveSmtpSettings = () => {
    if (!smtpSettings.host || !smtpSettings.port || !smtpSettings.username) {
      toast({
        title: "Error",
        description: "Please fill in all required SMTP fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "SMTP Settings Saved",
      description: "Email configuration has been updated successfully.",
    });
  };

  const handleTestSmtp = () => {
    toast({
      title: "Testing SMTP Configuration",
      description: "Sending test email...",
    });

    // Simulate test email
    setTimeout(() => {
      toast({
        title: "SMTP Test Successful",
        description: "Test email sent successfully. SMTP configuration is working.",
      });
    }, 2000);
  };

  const handleUpdateCredentials = () => {
    if (!adminCredentials.currentPassword || !adminCredentials.newPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (adminCredentials.newPassword !== adminCredentials.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Credentials Updated",
      description: "Admin email and password have been updated successfully.",
    });
    
    setAdminCredentials(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleSaveSiteSettings = () => {
    if (!siteSettings.title || !siteSettings.tagline) {
      toast({
        title: "Error",
        description: "Please fill in all required site settings fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Site Settings Saved",
      description: "Website settings have been updated successfully.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Logo Uploaded",
        description: "Logo has been uploaded successfully.",
      });
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Favicon Uploaded",
        description: "Favicon has been uploaded successfully.",
      });
    }
  };

  const handleCreateBackup = () => {
    setBackupStatus('creating');
    
    // Simulate backup creation
    setTimeout(() => {
      setBackupStatus('completed');
      toast({
        title: "Backup Created Successfully",
        description: "Full system backup has been created and is ready for download.",
      });
    }, 3000);
  };

  const handleDownloadBackup = () => {
    toast({
      title: "Downloading Backup",
      description: "Your backup file is being prepared for download.",
    });
  };

  const getBackupStatusBadge = () => {
    switch (backupStatus) {
      case 'creating':
        return <Badge className="bg-blue-100 text-blue-800">Creating...</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">Idle</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">System Settings</h2>
      </div>

      <Tabs defaultValue="smtp" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="smtp" className="text-xs sm:text-sm">SMTP Config</TabsTrigger>
          <TabsTrigger value="credentials" className="text-xs sm:text-sm">Admin Account</TabsTrigger>
          <TabsTrigger value="backup" className="text-xs sm:text-sm">System Backup</TabsTrigger>
          <TabsTrigger value="site" className="text-xs sm:text-sm">Site Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                SMTP Email Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-host">SMTP Host *</Label>
                  <Input
                    id="smtp-host"
                    value={smtpSettings.host}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, host: e.target.value }))}
                    placeholder="e.g., smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">Port *</Label>
                  <Input
                    id="smtp-port"
                    value={smtpSettings.port}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, port: e.target.value }))}
                    placeholder="e.g., 587"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-username">Username/Email *</Label>
                  <Input
                    id="smtp-username"
                    type="email"
                    value={smtpSettings.username}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="your-email@domain.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-password">Password</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter SMTP password"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleSaveSmtpSettings} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save SMTP Settings
                </Button>
                <Button variant="outline" onClick={handleTestSmtp} className="flex-1">
                  <TestTube className="w-4 h-4 mr-2" />
                  Test Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@dghub.com"
                />
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Change Password</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="current-password">Current Password *</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={adminCredentials.currentPassword}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, currentPassword: e.target.value }))}
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
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, newPassword: e.target.value }))}
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password *</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={adminCredentials.confirmPassword}
                        onChange={(e) => setAdminCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
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

        <TabsContent value="backup" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" />
                System Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Important Backup Information</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Creating a backup will generate a complete copy of your system data including 
                      projects, clients, partners, and all configurations. This process may take a few minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Backup Status</p>
                        <div className="mt-2">
                          {getBackupStatusBadge()}
                        </div>
                      </div>
                      <Database className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Last Backup</p>
                        <p className="text-sm text-gray-800 mt-1">Never</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleCreateBackup} 
                  disabled={backupStatus === 'creating'}
                  className="w-full"
                >
                  <Database className="w-4 h-4 mr-2" />
                  {backupStatus === 'creating' ? 'Creating Backup...' : 'Create Full Backup'}
                </Button>
                
                {backupStatus === 'completed' && (
                  <Button 
                    variant="outline" 
                    onClick={handleDownloadBackup}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Backup File
                  </Button>
                )}
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>• Backup includes all project data, client information, and system settings</p>
                <p>• Recommended to create backups weekly or before major system updates</p>
                <p>• Store backup files in a secure location outside the system</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="site" className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Site Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site-title">Website Title *</Label>
                  <Input
                    id="site-title"
                    value={siteSettings.title}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter website title"
                  />
                </div>
                <div>
                  <Label htmlFor="site-tagline">Tagline *</Label>
                  <Input
                    id="site-tagline"
                    value={siteSettings.tagline}
                    onChange={(e) => setSiteSettings(prev => ({ ...prev, tagline: e.target.value }))}
                    placeholder="Enter website tagline"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Brand Assets</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="logo-upload">Logo Upload</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('logo-upload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                      {siteSettings.logo && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Logo uploaded
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="favicon-upload">Favicon Upload</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <Input
                        id="favicon-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFaviconUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById('favicon-upload')?.click()}
                      >
                        <Image className="w-4 h-4 mr-2" />
                        Upload Favicon
                      </Button>
                      {siteSettings.favicon && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Favicon uploaded
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveSiteSettings} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Site Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
