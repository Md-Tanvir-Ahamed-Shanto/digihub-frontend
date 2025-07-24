import axiosInstance from '@/api/axios';
import Header from '@/components/Header';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, CheckCircle, Code, Database, Globe, Settings, Shield, Smartphone, Zap, DollarSign, BarChart3, FileText, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Solution {
  id: string;
  title: string;
  description: string;
  image: string | null;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

const iconMap = {
  Code,
  Globe,
  Settings,
  Shield,
  Database,
  Zap,
  Smartphone,
  DollarSign,
  BarChart3,
  FileText,
  Calculator
};

const Solutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get random icon for solutions without images
  const getRandomIcon = () => {
    const iconNames = Object.keys(iconMap);
    const randomIndex = Math.floor(Math.random() * iconNames.length);
    return iconNames[randomIndex];
  };

  const getIcon = () => {
    const randomIconName = getRandomIcon();
    return iconMap[randomIconName as keyof typeof iconMap];
  };


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

  return (
    <div className="min-h-screen bg-white">
      {/* Header would go here */}
          <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Code className="w-4 h-4" />
              <span>Technology Solutions</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Business <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We help businesses transform their ideas into successful digital ventures. 
              Our comprehensive web application solutions are designed to drive growth, 
              improve efficiency, and create lasting value for your organization.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Link to={"/submit-project"}>
              Transform Your Business
              </Link>
              <ArrowRight className="w-5 h-5 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading solutions...</p>
            </div>
          ) : solutions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No solutions available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {solutions.map((solution) => {
                const IconComponent = getIcon();
                
                return (
                  <div key={solution.id} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-blue-300 group animate-fade-in">
                    
                    {/* Logo Section - Image or Icon */}
                    <div className="flex items-center mb-6">
                      {solution.image ? (
                        // Show image as logo if it exists
                        <div className="w-16 h-16 rounded-2xl overflow-hidden mr-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <img 
                            src={`${import.meta.env.VITE_API_URL || ''}${solution.image}`}
                            alt={`${solution.title} logo`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // If image fails to load, replace with icon
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                                    </svg>
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        // Show icon as logo if no image
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-105 transition-transform duration-300">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {solution.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {solution.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <Link to={`/submit-project`}>
                      Start Your Project
                      </Link>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Technology Stack</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use cutting-edge technologies to ensure your solution is fast, secure, and scalable.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((tech, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-semibold text-gray-800">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your ideas and create a custom solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                <Link to={"/submit-project"}>
                Start Your Project
                </Link>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer would go here */}
    </div>
  );
};

export default Solutions;