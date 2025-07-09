import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Handshake, ArrowLeft, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DeveloperLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Technical Partner login attempted with:', { email, password });

    // Demo authentication
    if (email === 'developer@demo.com' && password === '123456') {
      toast({
        title: "Login Successful",
        description: "Welcome to your technical partner dashboard!"
      });
      navigate('/developer-dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please use the demo credentials.",
        variant: "destructive"
      });
    }
  };

  const handleUseDemo = () => {
    setEmail('developer@demo.com');
    setPassword('123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-gray-50 to-brand-secondary/5">
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
                <span className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  DGHUB
                </span>
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-secondary/10 rounded-full mb-4">
              <Code className="w-8 h-8 text-brand-secondary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-gray-900 mb-2 font-poppins">Technical Partner Login</h1>
            <p className="text-sm md:text-base text-brand-gray-600">Access your assigned projects and development tasks</p>
          </div>

          <Card className="border-brand-gray-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl text-brand-secondary">Technical Partner Portal</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Sign in to view your assigned projects and tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="partner@dghub.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="border-brand-gray-300 focus:border-brand-secondary h-10 md:h-11" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm md:text-base">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="border-brand-gray-300 focus:border-brand-secondary h-10 md:h-11" 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-brand-secondary hover:bg-brand-secondary/90 font-semibold h-10 md:h-11 text-sm md:text-base"
                >
                  Access Technical Partner Dashboard
                </Button>
              </form>

              <div className="mt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleUseDemo} 
                  className="w-full border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white h-10 md:h-11 text-sm md:text-base"
                >
                  Use Demo Credentials
                </Button>
              </div>
              
              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-brand-gray-50 rounded-lg border border-brand-gray-200">
                <h4 className="font-medium text-brand-gray-900 mb-2 text-sm md:text-base">Demo Credentials:</h4>
                <p className="text-xs md:text-sm text-brand-gray-600">Email: developer@demo.com</p>
                <p className="text-xs md:text-sm text-brand-gray-600">Password: 123456</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLogin;
