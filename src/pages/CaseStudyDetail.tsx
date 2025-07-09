
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, DollarSign, ExternalLink, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CaseStudyDetail = () => {
  const { id } = useParams();
  
  // Mock data - in real app, fetch by ID
  const caseStudy = {
    id: parseInt(id || '1'),
    title: 'PhysioConnect - Patient Management Platform',
    industry: 'Healthcare',
    client: 'Melbourne Physiotherapy',
    description: 'Complete patient management system with appointment booking, treatment tracking, and billing integration designed specifically for physiotherapy clinics.',
    challenge: 'Melbourne Physiotherapy was struggling with manual appointment scheduling and patient record management, leading to inefficiency, double bookings, and lost patient information. They needed a comprehensive digital solution that could handle their entire patient workflow.',
    solution: 'We built a comprehensive web application with automated appointment booking, digital patient records, treatment progress tracking, and integrated payment processing. The system includes a patient portal for self-service booking and a comprehensive admin dashboard for clinic management.',
    features: [
      'Online Booking System with Calendar Integration',
      'Patient Portal with Treatment History',
      'Treatment Progress Tracking & Notes',
      'Billing Integration with Invoice Generation',
      'Mobile Responsive Design',
      'Email & SMS Notifications',
      'Reporting Dashboard',
      'Multi-therapist Management'
    ],
    timeline: '3 months',
    cost: '$12,500',
    rating: 5,
    feedback: 'Exceptional work! The platform has streamlined our operations significantly and our patients love the convenience of online booking. Our efficiency has increased by 40% and we\'ve reduced no-shows by 60%.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'TypeScript'],
    results: [
      '40% increase in operational efficiency',
      '60% reduction in no-shows',
      '95% patient satisfaction rate',
      '3x faster appointment scheduling'
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-32 pb-8 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <Link 
            to="/case-studies" 
            className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-12 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium rounded-full">
                {caseStudy.industry}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(caseStudy.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                ))}
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-gray-900 mb-4 font-poppins">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-brand-gray-600 mb-8">
              {caseStudy.description}
            </p>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-brand-primary" />
                <div>
                  <p className="text-sm text-brand-gray-500">Timeline</p>
                  <p className="font-semibold text-brand-gray-900">{caseStudy.timeline}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="w-6 h-6 text-brand-success" />
                <div>
                  <p className="text-sm text-brand-gray-500">Investment</p>
                  <p className="font-semibold text-brand-gray-900">{caseStudy.cost}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-6 h-6 text-brand-secondary" />
                <div>
                  <p className="text-sm text-brand-gray-500">Client</p>
                  <p className="font-semibold text-brand-gray-900">{caseStudy.client}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Challenge */}
                <div>
                  <h2 className="text-2xl font-bold text-brand-gray-900 mb-4 font-poppins">The Challenge</h2>
                  <p className="text-brand-gray-600 leading-relaxed">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-2xl font-bold text-brand-gray-900 mb-4 font-poppins">Our Solution</h2>
                  <p className="text-brand-gray-600 leading-relaxed">{caseStudy.solution}</p>
                </div>

                {/* Screenshots Gallery */}
                <div>
                  <h2 className="text-2xl font-bold text-brand-gray-900 mb-6 font-poppins">Screenshots</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {caseStudy.images.map((image, index) => (
                      <div key={index} className="aspect-video bg-brand-gray-100 rounded-xl flex items-center justify-center border border-brand-gray-200">
                        <ExternalLink className="w-8 h-8 text-brand-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-brand-gray-900 mb-6 font-poppins">Results Achieved</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-brand-gray-50 rounded-xl">
                        <div className="w-6 h-6 bg-brand-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <p className="text-brand-gray-700 font-medium">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client Feedback */}
                <div className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-brand-gray-900 mb-4 font-poppins">Client Feedback</h2>
                  <blockquote className="text-lg text-brand-gray-700 italic leading-relaxed">
                    "{caseStudy.feedback}"
                  </blockquote>
                  <div className="mt-4">
                    <p className="font-semibold text-brand-gray-900">{caseStudy.client}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Key Features */}
                <div className="bg-white p-6 rounded-2xl border border-brand-gray-200 shadow-lg">
                  <h3 className="text-lg font-semibold text-brand-gray-900 mb-4">Key Features</h3>
                  <div className="space-y-3">
                    {caseStudy.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-brand-gray-600">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="bg-white p-6 rounded-2xl border border-brand-gray-200 shadow-lg">
                  <h3 className="text-lg font-semibold text-brand-gray-900 mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-6 rounded-2xl text-white">
                  <h3 className="text-lg font-semibold mb-3">Ready to Start Your Project?</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Get a similar solution for your business with our expert development team.
                  </p>
                  <Button className="w-full bg-white text-brand-primary hover:bg-brand-gray-100">
                    Start Your Project
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
