
import { ArrowRight, Filter, Star, ExternalLink, TrendingUp, DollarSign, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  const filters = ['All', 'Healthcare', 'Real Estate', 'E-commerce', 'Local Services', 'Education'];
  
  const caseStudies = [
    {
      id: 1,
      title: 'PhysioConnect - Transforming Patient Care',
      industry: 'Healthcare',
      client: 'Melbourne Physiotherapy Clinic',
      challenge: 'Manual appointment booking and patient tracking was limiting clinic growth and patient satisfaction.',
      solution: 'Complete digital transformation with patient management platform featuring online booking, treatment tracking, and billing integration.',
      results: {
        efficiency: '60% reduction in administrative time',
        growth: '40% increase in patient bookings',
        satisfaction: '95% patient satisfaction rate'
      },
      features: ['Online Booking System', 'Patient Portal', 'Treatment Tracking', 'Billing Integration', 'Mobile Responsive'],
      timeline: '3 months',
      investment: '$12,500',
      roi: '300% ROI in first year',
      rating: 5,
      feedback: 'The platform has completely transformed our operations. We can now focus on patient care instead of paperwork.',
      image: 'photo-1559757148-5c350d0d3c56',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 2,
      title: 'PropertyHub - Real Estate Revolution',
      industry: 'Real Estate',
      client: 'Sydney Property Management',
      challenge: 'Managing multiple properties across different locations was complex and time-consuming.',
      solution: 'Comprehensive property management platform with tenant portals, maintenance tracking, and financial reporting.',
      results: {
        efficiency: '70% faster property management',
        growth: '50% increase in managed properties',
        satisfaction: '92% tenant satisfaction'
      },
      features: ['Property Management', 'Tenant Portal', 'Maintenance Requests', 'Financial Reports', 'Document Management'],
      timeline: '4 months',
      investment: '$18,750',
      roi: '250% ROI in 18 months',
      rating: 5,
      feedback: 'This platform has allowed us to scale our business significantly while improving service quality.',
      image: 'photo-1560518883-ce09059eeffa',
      tags: ['React', 'Express', 'MongoDB', 'AWS'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 3,
      title: 'TutorPro - Educational Excellence',
      industry: 'Education',
      client: 'Brighton Learning Academy',
      challenge: 'Traditional classroom management was limiting student engagement and parent communication.',
      solution: 'Modern learning management system with course management, progress tracking, and parent dashboards.',
      results: {
        efficiency: '80% improvement in course delivery',
        growth: '35% increase in student enrollment',
        satisfaction: '98% parent satisfaction'
      },
      features: ['Course Management', 'Student Progress', 'Online Assessments', 'Parent Dashboard', 'Video Integration'],
      timeline: '5 months',
      investment: '$22,000',
      roi: '400% ROI in 2 years',
      rating: 5,
      feedback: 'The system has revolutionized how we deliver education and engage with parents.',
      image: 'photo-1503676260728-1c00da094a0b',
      tags: ['React', 'TypeScript', 'Supabase', 'Vimeo API'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 4,
      title: 'PlumberPro - Service Excellence',
      industry: 'Local Services',
      client: 'Elite Plumbing Solutions',
      challenge: 'Scheduling conflicts and poor customer communication were affecting business growth.',
      solution: 'Integrated service management platform with customer CRM and mobile technician app.',
      results: {
        efficiency: '50% reduction in scheduling conflicts',
        growth: '60% increase in customer base',
        satisfaction: '96% customer satisfaction'
      },
      features: ['Online Booking', 'CRM System', 'Job Scheduling', 'Mobile App', 'Invoice Generation'],
      timeline: '3.5 months',
      investment: '$15,800',
      roi: '320% ROI in first year',
      rating: 5,
      feedback: 'Our efficiency has increased dramatically and customers love the professional service experience.',
      image: 'photo-1621905251918-48416bd8575a',
      tags: ['React Native', 'Node.js', 'PostgreSQL', 'Google Maps'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 5,
      title: 'ShopEasy - E-commerce Success',
      industry: 'E-commerce',
      client: 'Organic Foods Australia',
      challenge: 'Limited online presence was restricting market reach and subscription management was manual.',
      solution: 'Complete e-commerce transformation with subscription services, inventory management, and analytics.',
      results: {
        efficiency: '90% automation of order processing',
        growth: '150% increase in online sales',
        satisfaction: '94% customer retention rate'
      },
      features: ['Subscription Management', 'Inventory Tracking', 'Analytics Dashboard', 'Payment Gateway', 'Order Management'],
      timeline: '6 months',
      investment: '$28,500',
      roi: '500% ROI in 18 months',
      rating: 5,
      feedback: 'The platform has transformed our business model and opened new revenue streams we never imagined.',
      image: 'photo-1556742049-0cfed4f6a45d',
      tags: ['React', 'Node.js', 'Redis', 'Stripe', 'Analytics'],
      color: 'from-orange-500 to-amber-600'
    }
  ];

  const filteredCaseStudies = selectedFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedFilter);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-brand-secondary/10 text-brand-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Success Stories</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Real Business <span className="text-gradient">Transformations</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              Discover how we've helped businesses across Europe and Australia transform their ideas 
              into successful digital solutions that drive growth and market leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-brand-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2 text-brand-gray-600">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by Industry:</span>
            </div>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-brand-primary text-white shadow-lg'
                    : 'bg-brand-gray-100 text-brand-gray-700 hover:bg-brand-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredCaseStudies.map((study, index) => (
              <div
                key={study.id}
                className="bg-white border border-brand-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Project Image */}
                <div 
                  className="aspect-video bg-cover bg-center"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/${study.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)`
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div className={`px-3 py-1 bg-gradient-to-r ${study.color} text-white text-sm font-medium rounded-full`}>
                      {study.industry}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(study.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-brand-success" />
                        <span className="text-sm text-brand-success font-medium">{study.roi}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-brand-gray-900 mb-2 font-poppins group-hover:text-brand-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-brand-gray-600 text-sm">{study.challenge}</p>
                  </div>

                  {/* Results Preview */}
                  <div className="mb-4 p-4 bg-brand-gray-50 rounded-xl">
                    <h4 className="font-semibold text-brand-gray-900 mb-2 text-sm">Key Results</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 text-brand-primary" />
                        <span className="text-xs text-brand-gray-600">{study.results.efficiency}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-brand-success" />
                        <span className="text-xs text-brand-gray-600">{study.results.growth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-brand-gray-900 mb-2 text-sm">Solution Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {study.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded font-medium">
                          {tag}
                        </span>
                      ))}
                      {study.tags.length > 3 && (
                        <span className="px-2 py-1 bg-brand-gray-100 text-brand-gray-600 text-xs rounded">
                          +{study.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link to={`/case-studies/${study.id}`}>
                    <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105 flex items-center justify-center">
                      View Success Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </Link>
                </div>
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
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join our growing list of successful businesses across Europe and Australia. 
              Let's transform your idea into a market-leading solution.
            </p>
            <Link to="/submit-project">
              <Button className="bg-white text-brand-primary hover:bg-brand-gray-100 font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                Start Your Transformation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
