
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import axiosInstance from '@/api/axios';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axiosInstance.post('/contact', formData);
    if(response.status === 201) {
      toast({
        title: 'Success',
        description: 'Your message has been sent successfully',
      })
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    }
    console.log('Contact form submitted:', response.data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@digihub.com.au',
      description: 'Send us an email anytime',
      color: 'from-brand-primary to-brand-primary/80'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+61 (0) 123 456 789',
      description: 'Mon-Fri from 9am to 6pm AEST',
      color: 'from-brand-secondary to-brand-secondary/80'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Sydney, Australia',
      description: 'Our headquarters location',
      color: 'from-brand-accent to-brand-accent/80'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: '9:00 AM - 6:00 PM AEST',
      description: 'Monday to Friday',
      color: 'from-brand-success to-brand-success/80'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-brand-accent/10 text-brand-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              Ready to start your web application project? We're here to help you transform your business ideas into reality. 
              Get in touch with our team of experts today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white border border-brand-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 group animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-brand-gray-900 mb-2 font-poppins">{info.title}</h3>
                <p className="text-brand-gray-900 font-semibold mb-1">{info.details}</p>
                <p className="text-brand-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-20 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-brand-gray-200">
                <h2 className="text-3xl font-bold text-brand-gray-900 mb-6 font-poppins">
                  Send us a <span className="text-gradient">Message</span>
                </h2>
                <p className="text-brand-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-brand-gray-900 font-medium">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-2 border-brand-gray-300 focus:border-brand-primary rounded-xl"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-brand-gray-900 font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-2 border-brand-gray-300 focus:border-brand-primary rounded-xl"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="company" className="text-brand-gray-900 font-medium">Company</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="mt-2 border-brand-gray-300 focus:border-brand-primary rounded-xl"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-brand-gray-900 font-medium">Subject *</Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="mt-2 border-brand-gray-300 focus:border-brand-primary rounded-xl"
                        placeholder="Project inquiry"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-brand-gray-900 font-medium">Message *</Label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="mt-2 w-full border border-brand-gray-300 focus:border-brand-primary rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
                      placeholder="Tell us about your project requirements..."
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-4 rounded-xl hover:shadow-lg transition-all duration-300 group"
                  >
                    Send Message
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8 animate-scale-in">
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-brand-gray-200">
                <h3 className="text-2xl font-bold text-brand-gray-900 mb-6 font-poppins">Our Location</h3>
                <div className="aspect-video bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-brand-primary mx-auto mb-3" />
                    <p className="text-brand-gray-600 font-medium">Sydney, Australia</p>
                    <p className="text-brand-gray-500 text-sm">Interactive map coming soon</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-primary mt-1" />
                    <div>
                      <p className="font-semibold text-brand-gray-900">Headquarters</p>
                      <p className="text-brand-gray-600">Sydney, NSW, Australia</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-brand-secondary mt-1" />
                    <div>
                      <p className="font-semibold text-brand-gray-900">Business Hours</p>
                      <p className="text-brand-gray-600">Monday - Friday: 9:00 AM - 6:00 PM AEST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 font-poppins">Need Immediate Assistance?</h3>
                <p className="text-white/90 mb-6">
                  For urgent project inquiries or technical support, reach out directly:
                </p>
                <div className="space-y-4">
                  <a href="mailto:hello@digihub.com.au" className="flex items-center space-x-3 text-white hover:text-brand-accent transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>hello@digihub.com.au</span>
                  </a>
                  <a href="tel:+61123456789" className="flex items-center space-x-3 text-white hover:text-brand-accent transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+61 (0) 123 456 789</span>
                  </a>
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

export default Contact;
