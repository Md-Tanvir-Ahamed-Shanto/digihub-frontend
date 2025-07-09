import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Globe, Users, Code, Award, Sparkles } from 'lucide-react';
const Hero = () => {
  const trustPoints = ['European & Australian focused', 'Trusted by 200+ businesses', 'Expert development team', 'Transparent milestone payments'];
  const stats = [{
    icon: Globe,
    value: '200+',
    label: 'Ideas Transformed'
  }, {
    icon: Users,
    value: '150+',
    label: 'Successful Ventures'
  }, {
    icon: Code,
    value: '10+',
    label: 'Technologies'
  }, {
    icon: Award,
    value: '5+',
    label: 'Years Experience'
  }];
  return <section className="pt-32 pb-20 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-brand-primary/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-brand-secondary/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Build Smart Digital Businesses</span>
              </div>
              
              <h1 className="font-bold text-brand-gray-900 leading-[1.4] lg:text-5xl\\n text-3xl text-left">
                We Help You Build 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-bold leading-[1.4]"> Smart Digital Solutions</span>
              </h1>
              
              <p className="text-xl text-brand-gray-600 leading-relaxed max-w-xl">
                Transform your ideas into profitable digital businesses. We handle everything from concept to launch.
              </p>

              {/* Trust Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustPoints.map((point, index) => <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-brand-success flex-shrink-0" />
                    <span className="text-brand-gray-700 font-medium">{point}</span>
                  </div>)}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/submit-project">
                <Button className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                  View Success Stories
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Success Dashboard Preview */}
          <div className="relative animate-scale-in">
            <div className="bg-gradient-to-br from-brand-primary to-brand-secondary rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-brand-gray-900 mb-2">Success Tracker</h3>
                  <p className="text-brand-gray-600">Your journey to success</p>
                </div>
                
                {/* Mock Progress Bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-brand-gray-700">Idea Validation</span>
                      <span className="text-brand-success font-semibold">100%</span>
                    </div>
                    <div className="w-full bg-brand-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-brand-success to-brand-success/80 h-3 rounded-full w-full shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-brand-gray-700">Product Development</span>
                      <span className="text-brand-primary font-semibold">75%</span>
                    </div>
                    <div className="w-full bg-brand-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-brand-primary to-brand-primary/80 h-3 rounded-full w-3/4 shadow-sm"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-brand-gray-700">Market Launch</span>
                      <span className="text-brand-gray-400 font-semibold">25%</span>
                    </div>
                    <div className="w-full bg-brand-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-brand-gray-400 to-brand-gray-300 h-3 rounded-full w-1/4 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-brand-accent text-white p-4 rounded-2xl shadow-lg animate-bounce">
              <Code className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-brand-success text-white p-4 rounded-2xl shadow-lg animate-bounce" style={{
            animationDelay: '0.5s'
          }}>
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => <div key={index} className="text-center space-y-3 group animate-slide-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-brand-gray-900">{stat.value}</div>
              <div className="text-brand-gray-600 font-medium">{stat.label}</div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Hero;