import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Handshake, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import axiosInstance from '@/api/axios';
import { toast } from '@/hooks/use-toast';

const SubmitProject = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    features: ""
  });
  const navigate = useNavigate();
  const industries = ['Plumbing & Trade Services', 'Real Estate', 'E-commerce', 'Healthcare', 'Automotive', 'Education', 'Professional Services', 'Food & Hospitality', 'Technology', 'Other'];
  const budgetRanges = ['$5,000', '$10,000', '$25,000', '$50,000', '$100,000+'];
  const timelineOptions = ['1-2 months', '2-4 months', '4-6 months', '6+ months'];
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const leadData = {
        name: formData.clientName,
        email: formData.email,
        phone: formData.phone,
        projectCategory: formData.industry,
        projectTitle: formData.projectTitle,
        description: formData.projectDescription,
        budgetRange: formData.budget.replace(/[^0-9]/g, ''),
        features: formData.features,
        timeline: formData.timeline,
        company: formData.company
      };
  
      const response = await axiosInstance.post('/lead/submit', leadData);
      
      if (response.data) {
        toast({
          title: 'Success!',
          description: 'Your project has been submitted successfully. We will contact you within 24 hours.',
        });
        navigate('/client-login');
        setFormData({
          clientName: '',
          company: '',
          email: '',
          phone: '',
          industry: '',
          projectTitle: '',
          projectDescription: '',
          budget: '',
          timeline: '',
          features: ''
        });
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      toast({
        title: 'Error',
        description: 'There was an error submitting your project. Please try again.',
        variant: 'destructive',
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-white via-brand-gray-50 to-brand-primary/5">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-brand-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Globe className="w-8 h-8 text-brand-primary" />
                <Handshake className="w-4 h-4 text-brand-accent absolute -bottom-1 -right-1" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-indigo-500">DIGIHUB AUST</span>
                <span className="text-sm font-light text-brand-gray-600 -mt-1">Digital Solutions Hub</span>
              </div>
            </Link>

            <Link to="/" className="flex items-center text-brand-gray-700 hover:text-brand-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-4 font-poppins">
              Start Your Project
            </h1>
            <p className="text-lg text-brand-gray-600 leading-relaxed">
              Tell us about your project and we'll provide you with a detailed quote and roadmap within 24 hours.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <div className="bg-white p-4 rounded-lg border border-brand-gray-200 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-brand-gray-700">Free Quote</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-brand-gray-200 text-center">
              <CheckCircle className="w-8 h-8 text-brand-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-brand-gray-700">24h Response</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-brand-gray-200 text-center">
              <CheckCircle className="w-8 h-8 text-brand-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-brand-gray-700">No Commitment</p>
            </div>
          </div>

          {/* Form */}
          <Card className="border-brand-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-brand-primary">Project Details</CardTitle>
              <CardDescription>
                Please fill out all the information below to help us understand your requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Full Name *</Label>
                    <Input id="clientName" value={formData.clientName} onChange={e => handleInputChange('clientName', e.target.value)} placeholder="John Smith" required className="border-brand-gray-300 focus:border-brand-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name *</Label>
                    <Input id="company" value={formData.company} onChange={e => handleInputChange('company', e.target.value)} placeholder="Your Company Ltd" required className="border-brand-gray-300 focus:border-brand-primary" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} placeholder="john@company.com" required className="border-brand-gray-300 focus:border-brand-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} placeholder="+61 400 000 000" className="border-brand-gray-300 focus:border-brand-primary" />
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select onValueChange={value => handleInputChange('industry', value)}>
                    <SelectTrigger className="border-brand-gray-300 focus:border-brand-primary">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectTitle">Project Title *</Label>
                  <Input id="projectTitle" value={formData.projectTitle} onChange={e => handleInputChange('projectTitle', e.target.value)} placeholder="Customer Management System" required className="border-brand-gray-300 focus:border-brand-primary" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea id="projectDescription" value={formData.projectDescription} onChange={e => handleInputChange('projectDescription', e.target.value)} placeholder="Describe what you want to build, who will use it, and what problems it should solve..." rows={5} required className="border-brand-gray-300 focus:border-brand-primary" />
                </div>
{/* 
                <div className="space-y-2">
                  <Label htmlFor="features">Key Features Required</Label>
                  <Textarea id="features" value={formData.features} onChange={e => handleInputChange('features', e.target.value)} placeholder="List the main features you need (e.g., user registration, payment processing, reporting dashboard...)" rows={4} className="border-brand-gray-300 focus:border-brand-primary" />
                </div> */}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range *</Label>
                    <Select onValueChange={value => handleInputChange('budget', value)}>
                      <SelectTrigger className="border-brand-gray-300 focus:border-brand-primary">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map(range => <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Desired Timeline</Label>
                    <Select onValueChange={value => handleInputChange('timeline', value)}>
                      <SelectTrigger className="border-brand-gray-300 focus:border-brand-primary">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {timelineOptions.map(timeline => <SelectItem key={timeline} value={timeline}>
                            {timeline}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 text-lg">
                  <Send className="w-5 h-5 mr-2" />
                  Submit Project Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <div className="mt-12 bg-white rounded-lg p-6 border border-brand-gray-200">
            <h3 className="text-lg font-semibold text-brand-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-brand-gray-600">We'll review your requirements and contact you within 24 hours</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-brand-gray-600">We'll schedule a discovery call to discuss your project in detail</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-brand-gray-600">You'll receive a detailed quote and project roadmap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SubmitProject;