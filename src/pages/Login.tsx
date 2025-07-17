
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Handshake, User, Building2, Shield, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent, userType: string) => {
    e.preventDefault();
    console.log(`${userType} login attempted with:`, { email, password });
    // TODO: Implement actual authentication logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-orange-50/20">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="w-8 h-8 text-blue-600" />
                <Handshake className="w-4 h-4 text-orange-600 absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">DIGIHUB AUST</span>
                <span className="text-sm font-light text-gray-600 -mt-1">Digital Solutions Hub</span>
              </div>
            </Link>

            <Link to="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Choose your login type to access your dashboard</p>
          </div>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="client" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Client</span>
              </TabsTrigger>
              <TabsTrigger value="partner" className="flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Partner</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Client Login</CardTitle>
                  <CardDescription>
                    Access your project dashboard and track progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, 'client')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-email">Email</Label>
                      <Input
                        id="client-email"
                        type="email"
                        placeholder="your.email@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-password">Password</Label>
                      <Input
                        id="client-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Login as Client
                    </Button>
                  </form>
                  <div className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="partner">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Technical Partner Login</CardTitle>
                  <CardDescription>
                    Access your assigned projects and development tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, 'partner')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner-email">Email</Label>
                      <Input
                        id="partner-email"
                        type="email"
                        placeholder="contact@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partner-password">Password</Label>
                      <Input
                        id="partner-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Login as Technical Partner
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle className="text-orange-600">Admin Login</CardTitle>
                  <CardDescription>
                    Access the full management dashboard and controls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@DIGIHUB AUST.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="admin-password">Password</Label>
                      <Input
                        id="admin-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                      Login as Admin
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              New client? 
              <Link to="/submit-project" className="text-blue-600 hover:underline ml-1">
                Start your project here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
