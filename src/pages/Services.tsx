
import { ArrowRight, CheckCircle, Code, Database, Globe, Settings, Shield, Smartphone, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Web Application Development',
      description: 'Tailor-made web applications built from scratch to meet your specific business requirements.',
      features: ['React/TypeScript', 'Modern UI/UX', 'Responsive Design', 'API Integration'],
      color: 'from-brand-primary to-brand-primary/80'
    },
    {
      icon: Globe,
      title: 'SaaS Platform Development',
      description: 'Scalable Software-as-a-Service platforms with subscription management and multi-tenancy.',
      features: ['Multi-tenant Architecture', 'Subscription Billing', 'User Management', 'Analytics Dashboard'],
      color: 'from-brand-secondary to-brand-secondary/80'
    },
    {
      icon: Settings,
      title: 'Admin Dashboard & Backend Panel Development',
      description: 'Comprehensive admin interfaces for managing users, content, and business operations.',
      features: ['Real-time Analytics', 'User Management', 'Content Management', 'Role-based Access'],
      color: 'from-brand-accent to-brand-accent/80'
    },
    {
      icon: Shield,
      title: 'Client Portal Development',
      description: 'Secure client portals for project management, communication, and document sharing.',
      features: ['Secure Authentication', 'File Management', 'Communication Tools', 'Project Tracking'],
      color: 'from-brand-success to-brand-success/80'
    },
    {
      icon: Database,
      title: 'Project & Task Management Systems',
      description: 'Comprehensive project management tools with task tracking, time management, and team collaboration.',
      features: ['Task Automation', 'Time Tracking', 'Team Collaboration', 'Progress Reports'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Finance & Billing Modules',
      description: 'Integrated financial management systems with invoicing, payment processing, and reporting.',
      features: ['Automated Invoicing', 'Payment Integration', 'Financial Reports', 'Tax Management'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Support Ticket / Inquiry Systems',
      description: 'Customer support platforms with ticket management, live chat, and knowledge base.',
      features: ['Ticket Management', 'Live Chat', 'Knowledge Base', 'SLA Tracking'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'Progressive Web Apps (PWA)',
      description: 'Mobile-first web applications with offline capabilities and native app-like experience.',
      features: ['Offline Functionality', 'Push Notifications', 'App-like Experience', 'Cross-platform'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Code className="w-4 h-4" />
              <span>Our Expertise</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Web Application <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              We specialize exclusively in custom web application development for European and Australian businesses. 
              From simple client portals to complex SaaS platforms, we deliver premium solutions.
            </p>
            <Link to="/submit-project">
              <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-brand-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-brand-primary/30 group animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-brand-gray-900 mb-4 font-poppins group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-brand-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-brand-success flex-shrink-0" />
                      <span className="text-brand-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-brand-gray-100">
                  <button className="text-brand-primary hover:text-brand-secondary font-semibold group-hover:translate-x-2 transition-all duration-300 flex items-center">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
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
              We use cutting-edge technologies to ensure your application is fast, secure, and scalable.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'].map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 group"
              >
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
              Ready to Build Your Application?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Let's discuss your project requirements and create a custom solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit-project">
                <Button className="bg-white text-brand-primary hover:bg-brand-gray-100 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                  Start Your Project
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-primary font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
