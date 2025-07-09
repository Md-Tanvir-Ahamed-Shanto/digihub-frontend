
import { FileText, Calculator, MapPin, CreditCard, Rocket, ArrowDown } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: 'Submit Your Project',
      description: 'Tell us about your project requirements, industry, and budget through our comprehensive form. Account creation is automatic.',
      step: '01'
    },
    {
      icon: Calculator,
      title: 'Get Your Quote',
      description: 'Our expert team analyzes your requirements and provides a detailed quote with transparent pricing and timeline.',
      step: '02'
    },
    {
      icon: MapPin,
      title: 'Project Roadmap',
      description: 'We create a detailed roadmap with clear milestones, deliverables, and percentage-based payment structure for your approval.',
      step: '03'
    },
    {
      icon: CreditCard,
      title: 'Milestone Payments',
      description: 'Pay securely as we complete each milestone. Transparent progress tracking with our integrated payment system.',
      step: '04'
    },
    {
      icon: Rocket,
      title: 'Launch & Support',
      description: 'We deliver your application with comprehensive testing, deployment, and provide ongoing support to ensure your success.',
      step: '05'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-brand-gray-50 to-brand-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-brand-secondary/10 to-transparent rounded-l-full"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-brand-secondary/10 text-brand-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            <span>Our Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-gray-900 mb-6 font-poppins">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process ensures transparency, quality, and on-time delivery 
            for every project we undertake. All communication happens within our platform.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative mb-16 last:mb-0">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-20 top-32 w-0.5 h-24 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-primary opacity-30"></div>
              )}
              
              <div className={`flex flex-col lg:flex-row items-center gap-12 animate-slide-up ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`} style={{animationDelay: `${index * 0.2}s`}}>
                
                {/* Step Icon & Number */}
                <div className="flex-shrink-0 relative">
                  <div className="w-40 h-40 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
                    <step.icon className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 text-center lg:text-left ${
                  index % 2 === 1 ? 'lg:text-right' : ''
                }`}>
                  <h3 className="text-3xl font-bold text-brand-gray-900 mb-4 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-brand-gray-600 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>

                {/* Visual Element */}
                <div className="hidden lg:block w-64 h-40 bg-white rounded-2xl shadow-lg border border-brand-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-full bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-brand-secondary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 bg-brand-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full mx-auto"></div>
                      <div className="text-xs text-brand-gray-500 font-medium">Processing...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-gray-100 max-w-md mx-auto">
            <h4 className="text-xl font-bold text-brand-gray-900 mb-4">Ready to start?</h4>
            <a
              href="/submit-project"
              className="inline-flex items-center bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              Start Your Project Journey
              <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
