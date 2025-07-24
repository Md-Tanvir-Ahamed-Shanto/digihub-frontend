
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Calendar, Clock, DollarSign, ExternalLink, Star, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

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

const CaseStudyDetail = () => {
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const response = await axiosInstance.get(`/case-studies/${id}`);
        setCaseStudy(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch case study. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCaseStudy();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
          <p className="text-brand-gray-600 mt-4">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-gray-600">Case study not found.</p>
          <Link to="/case-studies" className="text-brand-primary hover:text-brand-secondary mt-4 inline-block">
            Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-4xl lg:text-5xl font-bold text-brand-gray-900 mb-4 font-poppins">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-brand-gray-600 mb-8">
              {caseStudy.description}
            </p>
            
            {/* Client Info */}
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-6 h-6 text-brand-secondary" />
              <div>
                <p className="text-sm text-brand-gray-500">Client</p>
                <p className="font-semibold text-brand-gray-900">{caseStudy.client}</p>
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

                {/* Project Image */}
                {caseStudy.image && (
                  <div>
                    <h2 className="text-2xl font-bold text-brand-gray-900 mb-6 font-poppins">Project Overview</h2>
                    <div className="rounded-xl overflow-hidden">
                      <img src={`${import.meta.env.VITE_API_URL || ''}${caseStudy.image}`} alt={caseStudy.title} className="w-full h-auto" />
                    </div>
                  </div>
                )}

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-brand-gray-900 mb-6 font-poppins">Results Achieved</h2>
                  <div className="p-6 bg-brand-gray-50 rounded-xl">
                    <p className="text-brand-gray-700">{caseStudy.results}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
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
                  <Link to="/submit-project">
                    <Button className="w-full bg-white text-brand-primary hover:bg-brand-gray-100">
                      Start Your Project
                    </Button>
                  </Link>
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
