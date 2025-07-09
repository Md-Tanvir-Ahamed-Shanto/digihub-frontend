
import { Heart, GraduationCap, DollarSign, Home, ShoppingCart, Truck, MapPin, Users, Car } from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      icon: Heart,
      title: 'Healthtech',
      description: 'Telemedicine platforms, patient management systems, health monitoring applications.',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      icon: GraduationCap,
      title: 'EduTech',
      description: 'Learning management systems, online course platforms, student assessment tools.',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: DollarSign,
      title: 'Finance',
      description: 'Banking applications, payment processing systems, financial analytics platforms.',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Home,
      title: 'Real Estate',
      description: 'Property management platforms, listing portals, CRM systems for real estate agencies.',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Custom online stores, inventory management, integrated payment solutions.',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Truck,
      title: 'Logistics',
      description: 'Supply chain management, tracking systems, fleet management platforms.',
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-600'
    },
    {
      icon: MapPin,
      title: 'Tourism',
      description: 'Travel booking platforms, tour management systems, hospitality applications.',
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
    {
      icon: Car,
      title: 'Automotive Industry',
      description: 'Vehicle management systems, dealership platforms, service booking applications.',
      color: 'from-slate-500 to-gray-600',
      bgColor: 'bg-slate-50',
      iconColor: 'text-slate-600'
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            <span>Our Specializations</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-gray-900 mb-6 font-poppins">
            Industries We <span className="text-gradient">Serve</span>
          </h2>
          <p className="text-xl text-brand-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've delivered successful applications across diverse industries, 
            understanding the unique challenges and requirements of each sector in Europe and Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group bg-white border border-brand-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:border-brand-primary/30 hover:-translate-y-2 animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`w-16 h-16 ${industry.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                <industry.icon className={`w-8 h-8 ${industry.iconColor}`} />
              </div>
              
              <h3 className="text-xl font-bold text-brand-gray-900 mb-4 group-hover:text-brand-primary transition-colors font-poppins">
                {industry.title}
              </h3>
              
              <p className="text-brand-gray-600 leading-relaxed">
                {industry.description}
              </p>
              
              <div className="mt-6 flex items-center text-brand-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm">Learn More</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in">
          <div className="bg-brand-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-brand-gray-700 mb-6 text-lg">
              Don't see your industry? We work with businesses of all types across Europe and Australia.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors font-semibold group"
            >
              Discuss Your Project
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
