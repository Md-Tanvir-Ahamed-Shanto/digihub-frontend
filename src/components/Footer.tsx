import { Link } from 'react-router-dom';
import { Globe, Code, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    company: [{
      label: 'About Us',
      href: '/about'
    }, {
      label: 'Our Team',
      href: '/team'
    }, {
      label: 'Careers',
      href: '/careers'
    }, {
      label: 'Contact',
      href: '/contact'
    }],
    services: [{
      label: 'Custom Web Apps',
      href: '/services/web-development'
    }, {
      label: 'SaaS Platforms',
      href: '/services/saas'
    }, {
      label: 'Admin Dashboards',
      href: '/services/dashboards'
    }, {
      label: 'Client Portals',
      href: '/services/portals'
    }],
    support: [{
      label: 'Help Center',
      href: '/help'
    }, {
      label: 'Documentation',
      href: '/docs'
    }, {
      label: 'Case Studies',
      href: '/case-studies'
    }, {
      label: 'How It Works',
      href: '/how-it-works'
    }],
    legal: [{
      label: 'Privacy Policy',
      href: '/privacy'
    }, {
      label: 'Terms of Service',
      href: '/terms'
    }, {
      label: 'Cookie Policy',
      href: '/cookies'
    }, {
      label: 'GDPR Compliance',
      href: '/gdpr'
    }]
  };
  const socialLinks = [{
    icon: Facebook,
    href: '#',
    label: 'Facebook'
  }, {
    icon: Twitter,
    href: '#',
    label: 'Twitter'
  }, {
    icon: Linkedin,
    href: '#',
    label: 'LinkedIn'
  }, {
    icon: Instagram,
    href: '#',
    label: 'Instagram'
  }];
  return <footer className="bg-brand-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-brand-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <Code className="w-5 h-5 text-brand-accent absolute -bottom-1 -right-1 bg-brand-gray-900 rounded-full p-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white font-poppins">DGHUB</span>
                <span className="text-sm font-medium text-brand-primary">Digital Solutions Hub</span>
              </div>
            </Link>
            
            <p className="text-brand-gray-300 leading-relaxed">
              Your trusted partner for custom web application development. 
              Serving European and Australian businesses with premium, 
              scalable solutions since 2019.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-brand-gray-300">hello@dghub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-secondary/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-secondary" />
                </div>
                <span className="text-brand-gray-300">+61 (0) 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-accent" />
                </div>
                <span className="text-brand-gray-300">Sydney, Australia</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-poppins">Company</h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link, index) => <li key={index}>
                    <Link to={link.href} className="text-brand-gray-300 hover:text-brand-primary transition-colors duration-200 flex items-center group">
                      {link.label}
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-poppins">Services</h4>
              <ul className="space-y-4">
                {footerLinks.services.map((link, index) => <li key={index}>
                    <Link to={link.href} className="text-brand-gray-300 hover:text-brand-secondary transition-colors duration-200 flex items-center group">
                      {link.label}
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-poppins">Support</h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link, index) => <li key={index}>
                    <Link to={link.href} className="text-brand-gray-300 hover:text-brand-accent transition-colors duration-200 flex items-center group">
                      {link.label}
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-white font-poppins">Legal</h4>
              <ul className="space-y-4">
                {footerLinks.legal.map((link, index) => <li key={index}>
                    <Link to={link.href} className="text-brand-gray-300 hover:text-brand-primary transition-colors duration-200 flex items-center group">
                      {link.label}
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-brand-gray-700 mt-16 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-bold text-white mb-2 font-poppins">Stay Updated</h4>
              <p className="text-brand-gray-300">Get the latest insights on web application development and industry trends.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-brand-gray-800 border border-brand-gray-600 rounded-xl text-white placeholder:text-brand-gray-400 focus:outline-none focus:border-brand-primary transition-colors" />
              <button className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brand-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-brand-gray-400 text-sm">
              © {currentYear} Dghub: Digital Solutions Hub. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => <a key={index} href={social.href} className="w-12 h-12 bg-brand-gray-800 hover:bg-gradient-to-br hover:from-brand-primary hover:to-brand-secondary rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group" aria-label={social.label}>
                  <social.icon className="w-5 h-5 text-brand-gray-400 group-hover:text-white transition-colors" />
                </a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;