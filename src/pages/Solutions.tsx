import { ArrowRight, CheckCircle, Code, Database, Globe, Settings, Shield, Smartphone, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '@/api/axios';
import { useToast } from '@/hooks/use-toast';

interface Solution {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const iconMap = {
  Code,
  Globe,
  Settings,
  Shield,
  Database,
  Zap,
  Smartphone
};

const Solutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axiosInstance.get('/solutions');
        setSolutions(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch solutions. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Code className="w-4 h-4" />
              <span>Technology Solutions</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Business <span className="text-gradient">Solutions</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              We help businesses transform their ideas into successful digital ventures. 
              Our comprehensive web application solutions are designed to drive growth, 
              improve efficiency, and create lasting value for your organization.
            </p>
            <Link to="/submit-project">
              <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Transform Your Business
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
              <p className="text-brand-gray-600 mt-4">Loading solutions...</p>
            </div>
          ) : solutions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-gray-600">No solutions available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {solutions.map((solution, index) => {
                const IconComponent = iconMap[solution.icon as keyof typeof iconMap] || Globe;
                return (
                  <div key={index} className="bg-white border border-brand-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-brand-primary/30 group animate-slide-up" style={{
                    animationDelay: `${index * 0.1}s`
                  }}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-brand-gray-900 mb-4 font-poppins group-hover:text-brand-primary transition-colors">
                      {solution.title}
                    </h3>
                    
                    <p className="text-brand-gray-600 leading-relaxed mb-6">
                      {solution.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-brand-success flex-shrink-0" />
                          <span className="text-brand-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link to="/submit-project">
                      <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                        Start Your Project
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Our <span className="text-gradient">Technology Stack</span>
            </h2>
            <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto">
              We use cutting-edge technologies to ensure your solution is fast, secure, and scalable.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((tech, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                  <Code className="w-6 h-6 text-brand-primary" />
                </div>
                <span className="font-semibold text-brand-gray-800">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-poppins">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your ideas and create a custom solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit-project">
                <Button className="bg-white text-brand-primary hover:bg-brand-gray-100 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                  Start Your Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-2 border-white hover:bg-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 text-indigo-500">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};

export default Solutions;