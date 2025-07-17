import { ArrowLeft, Globe, Handshake, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SetPasswordFailed = () => {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get('reason');

  const getErrorMessage = () => {
    switch (reason) {
      case 'invalid_or_expired':
        return 'The password reset link is invalid or has expired. Please request a new one.';
      case 'server_error':
        return 'There was a server error while processing your request. Please try again later.';
      case 'no_token':
        return 'No verification token was provided. Please use the link from your email.';
      default:
        return 'An error occurred while setting your password. Please try again.';
    }
  };

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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="border-brand-gray-200 shadow-lg">
            <CardHeader className="text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-red-500 text-2xl">Password Setup Failed</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-brand-gray-600 mb-6">{getErrorMessage()}</p>
              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-2"
                >
                  <Link to="/client-login">Go to Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-brand-gray-300 hover:bg-brand-gray-50 text-brand-gray-700 font-semibold py-2"
                >
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordFailed;