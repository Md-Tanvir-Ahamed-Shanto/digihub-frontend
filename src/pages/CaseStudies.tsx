
import { ArrowRight, Filter, Star, ExternalLink, TrendingUp, DollarSign, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/api/axios';
import { useToast } from '@/hooks/use-toast';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string | null;
  challenge: string;
  solution: string;
  results: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

const CaseStudies = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const filters = ['All', 'Healthcare', 'Real Estate', 'E-commerce', 'Local Services', 'Education'];
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await axiosInstance.get('/case-studies');
        setCaseStudies(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch case studies. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const filteredCaseStudies = selectedFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.client === selectedFilter);

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

      {/* <section className="py-8 bg-white border-b border-brand-gray-200">
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
      </section> */}

      {/* Case Studies Grid */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
              <p className="text-brand-gray-600 mt-4">Loading case studies...</p>
            </div>
          ) : filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brand-gray-600">No case studies found for the selected industry.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredCaseStudies.map((study) => (
                <div
                  key={study.id}
                  className="bg-white border border-brand-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 group animate-slide-up"
                >
                  {study.image && (
                    <div className="aspect-video bg-cover bg-center relative">
                      <img src={`${import.meta.env.VITE_API_URL || ''}${study.image}`} alt={study.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <div className="px-3 py-1 bg-brand-primary/80 text-white text-sm font-medium rounded-full inline-block">
                          {study.client}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-gray-900 mb-2 font-poppins group-hover:text-brand-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-brand-gray-600 text-sm mb-4">{study.challenge}</p>

                    <div className="mb-4 p-4 bg-brand-gray-50 rounded-xl">
                      <h4 className="font-semibold text-brand-gray-900 mb-2 text-sm">Results</h4>
                      <p className="text-sm text-brand-gray-600">{study.results}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-brand-gray-900 mb-2 text-sm">Technologies Used</h4>
                      <div className="flex flex-wrap gap-1">
                        {study.technologies.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link to={`/case-studies/${study.id}`}>
                      <button className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                        View Success Story
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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
