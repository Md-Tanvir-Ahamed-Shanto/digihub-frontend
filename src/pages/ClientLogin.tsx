import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Handshake, ArrowLeft, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

const ClientLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/client/login', {
        email,
        password
      });
      
      const { token } = response.data;
      localStorage.setItem('accessToken', token);
      
      toast({
        title: "Login Successful",
        description: "Welcome to your client dashboard!"
      });
      
      navigate('/client-dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-gray-50 to-brand-primary/5">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-brand-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="w-8 h-8 text-brand-primary" />
                <Handshake className="w-4 h-4 text-brand-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-indigo-500">DIGIHUB AUST</span>
                <span className="text-sm font-light text-brand-gray-600 -mt-1">Digital Solutions Hub</span>
              </div>
            </Link>

            <Link to="/" className="flex items-center text-brand-gray-700 hover:text-brand-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary/10 rounded-full mb-4">
              <User className="w-8 h-8 text-brand-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-gray-900 mb-2 font-poppins">Client Login</h1>
            <p className="text-sm md:text-base text-brand-gray-600">Access your project dashboard and track progress</p>
          </div>

          <Card className="border-brand-gray-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl text-brand-primary">Welcome Back</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Please sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@company.com" value={email} onChange={e => setEmail(e.target.value)} required className="border-brand-gray-300 focus:border-brand-primary h-10 md:h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border-brand-gray-300 focus:border-brand-primary h-10 md:h-11" />
                </div>
                <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 font-semibold text-white h-10 md:h-11 text-sm md:text-base">
                  Sign In to Dashboard
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs md:text-sm text-brand-gray-600">
                  New client? 
                  <Link to="/submit-project" className="text-brand-primary hover:underline ml-1">
                    Start your project here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;