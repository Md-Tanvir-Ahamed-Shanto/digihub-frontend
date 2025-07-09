
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Eye, EyeOff, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EmailSettings = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '587',
    encryption: 'tls',
    username: '',
    password: '',
    fromEmail: '',
    fromName: ''
  });

  const handleSave = () => {
    toast({
      title: "Email Settings Saved",
      description: "SMTP configuration has been updated successfully."
    });
  };

  const handleTestEmail = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to verify the configuration."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>Set up SMTP settings for sending emails</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-host">SMTP Host</Label>
            <Input
              id="smtp-host"
              value={emailSettings.smtpHost}
              onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
              placeholder="smtp.gmail.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smtp-port">SMTP Port</Label>
            <Input
              id="smtp-port"
              value={emailSettings.smtpPort}
              onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
              placeholder="587"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="encryption">Encryption</Label>
            <Select value={emailSettings.encryption} onValueChange={(value) => setEmailSettings({...emailSettings, encryption: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tls">TLS</SelectItem>
                <SelectItem value="ssl">SSL</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={emailSettings.username}
              onChange={(e) => setEmailSettings({...emailSettings, username: e.target.value})}
              placeholder="your.email@gmail.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={emailSettings.password}
                onChange={(e) => setEmailSettings({...emailSettings, password: e.target.value})}
                placeholder="Your email password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="from-email">From Email</Label>
            <Input
              id="from-email"
              value={emailSettings.fromEmail}
              onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
              placeholder="noreply@yourdomain.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="from-name">From Name</Label>
            <Input
              id="from-name"
              value={emailSettings.fromName}
              onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
              placeholder="Your Company Name"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleTestEmail}>
            <Send className="w-4 h-4 mr-2" />
            Send Test Email
          </Button>
          <Button onClick={handleSave} className="bg-brand-primary hover:bg-brand-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Email Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSettings;
