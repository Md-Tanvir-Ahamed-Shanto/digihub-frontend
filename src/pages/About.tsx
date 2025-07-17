import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Globe, Users, Target, Award, Heart, Zap, Rocket, TrendingUp } from 'lucide-react';
const About = () => {
  const values = [{
    icon: Heart,
    title: "Client Success First",
    description: "Every decision we make is guided by our clients' success. We build lasting partnerships that help businesses thrive in the digital age."
  }, {
    icon: Zap,
    title: "Innovation & Excellence",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage in their markets."
  }, {
    icon: Users,
    title: "Global Collaboration",
    description: "Our distributed team model combines Australian business acumen with world-class Bangladeshi technical talent for optimal results."
  }, {
    icon: Award,
    title: "Quality Assurance",
    description: "We maintain the highest standards through rigorous testing, code reviews, and continuous improvement processes."
  }];
  const stats = [{
    number: "50+",
    label: "Ideas Transformed"
  }, {
    number: "30+",
    label: "Success Stories"
  }, {
    number: "8+",
    label: "Expert Specialists"
  }, {
    number: "15+",
    label: "Countries Reached"
  }];
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              About <span className="text-gradient">DIGIHUB AUST</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              We are a technology transformation partner connecting European and Australian 
              businesses with world-class development expertise to turn innovative ideas into successful digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                  Our Mission
                </h2>
                <p className="text-lg text-brand-gray-600 leading-relaxed mb-8">
                  To empower businesses across Europe and Australia by transforming their innovative ideas 
                  into market-ready digital solutions through expert guidance, transparent processes, 
                  and world-class technical execution.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-gray-900">Success-Driven Approach</h3>
                    <p className="text-brand-gray-600">Every solution is designed for market success and business growth</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-brand-gray-900 mb-4 font-poppins">Our Vision</h3>
                <p className="text-brand-gray-600 leading-relaxed">
                  To become the most trusted technology transformation partner for businesses worldwide, 
                  known for turning ambitious ideas into profitable digital solutions that drive 
                  sustainable business growth and market leadership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-16">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-poppins">
                Our Future Vision
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto">
                Shaping the future of business transformation through technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <TrendingUp className="w-12 h-12 text-white mb-6 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Solutions</h3>
                <p className="text-white/80 leading-relaxed">
                  Integrating artificial intelligence and machine learning to create smarter, 
                  more efficient business solutions that adapt and evolve with market needs.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <Globe className="w-12 h-12 text-white mb-6 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-4">Global Innovation Hub</h3>
                <p className="text-white/80 leading-relaxed">
                  Building a worldwide network of technology experts and business innovators 
                  to solve complex challenges and create breakthrough solutions.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <Zap className="w-12 h-12 text-white mb-6 mx-auto" />
                <h3 className="text-xl font-semibold text-white mb-4">Sustainable Technology</h3>
                <p className="text-white/80 leading-relaxed">
                  Pioneering environmentally conscious digital solutions that help businesses 
                  grow while contributing to a more sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                Our Core Values
              </h2>
              <p className="text-xl text-brand-gray-600">
                The principles that guide our approach to business transformation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => <div key={index} className="bg-white p-8 rounded-2xl border border-brand-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up" style={{
              animationDelay: `${index * 0.1}s`
            }}>
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-gray-900 mb-3">{value.title}</h3>
                  <p className="text-brand-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                Our Impact in Numbers
              </h2>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-brand-gray-600 font-medium">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="py-20 bg-gradient-to-r from-brand-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-gray-900 mb-6 font-poppins">
                Global Excellence, Local Understanding
              </h2>
              <p className="text-xl text-brand-gray-600">
                Connecting three continents for optimal business transformation
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-900 mb-4">Australia - Strategic Leadership</h3>
                <p className="text-brand-gray-600 leading-relaxed">
                  Our strategic headquarters provide business guidance, market insights, and ensure 
                  all solutions meet international standards and local market requirements.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-brand-secondary to-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-900 mb-4">Bangladesh - Technical Excellence</h3>
                <p className="text-brand-gray-600 leading-relaxed">
                  Our world-class development center delivers innovative technical solutions with 
                  expertise in cutting-edge technologies and cost-effective execution.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-brand-accent to-brand-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-gray-900 mb-4">Europe & Australia - Market Focus</h3>
                <p className="text-brand-gray-600 leading-relaxed">
                  We understand local market dynamics and business requirements, delivering 
                  solutions that drive growth in these competitive and sophisticated markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default About;