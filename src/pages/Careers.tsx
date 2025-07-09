
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Users, Send, Briefcase } from 'lucide-react';
import { useState } from 'react';

const Careers = () => {
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null
  });

  const openPositions = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Development",
      location: "Remote (Bangladesh)",
      type: "Full-time",
      salary: "$800 - $1200/month",
      description: "We're looking for an experienced React developer to join our team and work on exciting client projects.",
      requirements: [
        "3+ years of React development experience",
        "Strong knowledge of TypeScript",
        "Experience with modern build tools",
        "Good English communication skills",
        "Portfolio of completed projects"
      ],
      responsibilities: [
        "Develop and maintain client web applications",
        "Collaborate with design and backend teams",
        "Participate in code reviews",
        "Communicate with international clients"
      ]
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote (Bangladesh)",
      type: "Full-time",
      salary: "$600 - $900/month",
      description: "Join our creative team to design beautiful and functional interfaces for web applications.",
      requirements: [
        "2+ years of UI/UX design experience",
        "Proficiency in Figma and Adobe Creative Suite",
        "Understanding of web development constraints",
        "Strong portfolio showcasing web design work",
        "Knowledge of design systems"
      ],
      responsibilities: [
        "Create wireframes and mockups for client projects",
        "Design user interfaces and user experiences",
        "Collaborate with developers on implementation",
        "Present design concepts to clients"
      ]
    },
    {
      id: 3,
      title: "Project Manager",
      department: "Management",
      location: "Remote (Bangladesh/Australia)",
      type: "Full-time",
      salary: "$1000 - $1500/month",
      description: "Lead project delivery and coordinate between clients, developers, and stakeholders.",
      requirements: [
        "3+ years of project management experience",
        "Experience with web development projects",
        "Excellent English communication skills",
        "Knowledge of project management tools",
        "Client-facing experience preferred"
      ],
      responsibilities: [
        "Manage project timelines and deliverables",
        "Coordinate between teams and clients",
        "Ensure quality standards are met",
        "Handle client communications and updates"
      ]
    },
    {
      id: 4,
      title: "Backend Developer (Node.js)",
      department: "Development",
      location: "Remote (Bangladesh)",
      type: "Full-time",
      salary: "$700 - $1100/month",
      description: "Build robust backend systems and APIs for our client applications.",
      requirements: [
        "2+ years of Node.js development experience",
        "Experience with Express.js and databases",
        "Knowledge of REST API development",
        "Understanding of cloud platforms (AWS/Azure)",
        "Good problem-solving skills"
      ],
      responsibilities: [
        "Develop and maintain backend services",
        "Design and implement APIs",
        "Optimize database performance",
        "Ensure application security and scalability"
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setApplicationForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationForm);
    // TODO: Implement actual submission logic
    alert('Application submitted successfully! We will contact you within 48 hours.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              <span>Join Our Team</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Build Your <span className="text-gradient">Career</span> With Us
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              Join a dynamic, globally distributed team working on exciting projects for clients 
              across Europe and Australia. Grow your skills while making a real impact.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                Why Choose BEGL AgencyFace?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-900 mb-3">Global Team</h3>
                <p className="text-brand-gray-600 text-sm">Work with talented people from around the world</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-900 mb-3">Exciting Projects</h3>
                <p className="text-brand-gray-600 text-sm">Build innovative applications for diverse industries</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-accent to-brand-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-900 mb-3">Competitive Pay</h3>
                <p className="text-brand-gray-600 text-sm">Fair compensation with performance bonuses</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand-success to-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-brand-gray-900 mb-3">Flexible Hours</h3>
                <p className="text-brand-gray-600 text-sm">Work-life balance with flexible scheduling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                Open Positions
              </h2>
              <p className="text-xl text-brand-gray-600">
                Find your perfect role and start building amazing applications
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {openPositions.map((position) => (
                <Card key={position.id} className="border-brand-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <CardTitle className="text-xl text-brand-gray-900 font-poppins">{position.title}</CardTitle>
                        <CardDescription className="text-brand-primary font-medium">{position.department}</CardDescription>
                      </div>
                      <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-sm rounded-full">
                        {position.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-brand-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{position.salary}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-brand-gray-600 mb-6">{position.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-brand-gray-900 mb-2">Requirements:</h4>
                        <ul className="text-sm text-brand-gray-600 space-y-1">
                          {position.requirements.map((req, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-1 h-1 bg-brand-primary rounded-full mt-2 flex-shrink-0"></span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">
                        Apply for This Position
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                Submit Your Application
              </h2>
              <p className="text-xl text-brand-gray-600">
                Ready to join our team? Fill out the form below and we'll get back to you soon.
              </p>
            </div>
            
            <Card className="border-brand-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-brand-primary">Application Form</CardTitle>
                <CardDescription>
                  Please provide your details and we'll review your application within 48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={applicationForm.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={applicationForm.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={applicationForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position Applied For *</Label>
                      <Select onValueChange={(value) => handleInputChange('position', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          {openPositions.map((position) => (
                            <SelectItem key={position.id} value={position.title}>
                              {position.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverLetter">Cover Letter *</Label>
                    <Textarea
                      id="coverLetter"
                      value={applicationForm.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit for our team..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary/90 font-semibold py-3 text-lg">
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
