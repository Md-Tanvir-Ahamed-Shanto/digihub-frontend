
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, MessageSquare, Code, CreditCard, Rocket, Search, FileText, Users, Lightbulb, Target, Shield, Award } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Idea Validation & Discovery",
      description: "We start by understanding your business vision and validating your idea. Our team analyzes market potential, technical feasibility, and helps refine your concept into a viable tech solution.",
      icon: Lightbulb,
      color: "from-brand-primary to-brand-secondary"
    },
    {
      step: 2,
      title: "Solution Architecture",
      description: "We design a comprehensive technology roadmap tailored to your business goals. This includes user experience design, technical specifications, and a clear path to market success.",
      icon: Target,
      color: "from-brand-secondary to-brand-accent"
    },
    {
      step: 3,
      title: "Transparent Planning",
      description: "You'll receive a detailed project roadmap with clear milestones, timeline, and investment structure. Every step is transparent with no hidden costs or surprises.",
      icon: FileText,
      color: "from-brand-accent to-brand-success"
    },
    {
      step: 4,
      title: "Expert Team Assignment",
      description: "We assign the most suitable experts from our team based on your solution requirements. You'll work directly with experienced professionals who understand your industry.",
      icon: Users,
      color: "from-brand-success to-brand-primary"
    },
    {
      step: 5,
      title: "Milestone-Based Investment",
      description: "Invest in your solution milestone by milestone as progress is made. This approach ensures you see tangible results before each payment, reducing your risk significantly.",
      icon: CreditCard,
      color: "from-brand-primary to-brand-secondary"
    },
    {
      step: 6,
      title: "Continuous Collaboration",
      description: "Stay connected with your development team through our platform. Receive regular updates, provide feedback, and watch your idea transform into reality with full transparency.",
      icon: MessageSquare,
      color: "from-brand-secondary to-brand-accent"
    },
    {
      step: 7,
      title: "Quality Excellence",
      description: "Every milestone undergoes rigorous testing and quality assurance. We ensure your solution meets the highest standards before delivery, guaranteeing a product you can be proud of.",
      icon: Shield,
      color: "from-brand-accent to-brand-success"
    },
    {
      step: 8,
      title: "Launch & Growth Support",
      description: "We don't just deliver your solution — we ensure its successful launch. Receive comprehensive documentation, training, and ongoing support to help your business thrive.",
      icon: Rocket,
      color: "from-brand-success to-brand-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              How We Transform <span className="text-gradient">Ideas Into Success</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              Our proven process takes you from initial concept to market-ready solution with complete transparency, 
              milestone-based investment, and expert guidance every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {steps.map((stepData, index) => (
                <div 
                  key={stepData.step}
                  className="flex items-start space-x-6 animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stepData.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <stepData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-brand-gray-100 text-brand-gray-700 rounded-full text-sm font-bold">
                        {stepData.step}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-gray-900 mb-3 font-poppins">
                      {stepData.title}
                    </h3>
                    <p className="text-brand-gray-600 leading-relaxed">
                      {stepData.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Benefits */}
      <section className="py-20 bg-gradient-to-r from-brand-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-12 font-poppins">
              Why Our Approach Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-brand-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-900 mb-3">Risk-Free Investment</h3>
                <p className="text-brand-gray-600">
                  Milestone-based payments mean you only invest as we deliver results. See progress before every payment.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-brand-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-brand-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-brand-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-900 mb-3">Proven Expertise</h3>
                <p className="text-brand-gray-600">
                  Our team combines international business acumen with world-class technical expertise.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-brand-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-900 mb-3">Personal Partnership</h3>
                <p className="text-brand-gray-600">
                  Work directly with your dedicated team through our integrated communication platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
