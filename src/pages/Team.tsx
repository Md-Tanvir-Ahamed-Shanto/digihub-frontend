
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Github, Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "David Chen",
      role: "Founder & CEO",
      location: "Sydney, Australia",
      image: "/placeholder.svg",
      bio: "Leading BEGL with 8+ years in web development and international business operations.",
      skills: ["Business Strategy", "Project Management", "Client Relations"],
      social: {
        linkedin: "#",
        email: "david@beglagency.com"
      }
    },
    {
      name: "Rashid Ahmed",
      role: "Senior Full-Stack Developer",
      location: "Dhaka, Bangladesh",
      image: "/placeholder.svg",
      bio: "Expert in React, Node.js, and modern web technologies with 6+ years experience.",
      skills: ["React", "Node.js", "PostgreSQL", "AWS"],
      social: {
        github: "#",
        linkedin: "#",
        email: "rashid@beglagency.com"
      }
    },
    {
      name: "Fahim Hassan",
      role: "Frontend Developer",
      location: "Chittagong, Bangladesh",
      image: "/placeholder.svg",
      bio: "Specialized in creating beautiful, responsive user interfaces and user experiences.",
      skills: ["React", "TypeScript", "Tailwind CSS", "UI/UX"],
      social: {
        github: "#",
        linkedin: "#",
        email: "fahim@beglagency.com"
      }
    },
    {
      name: "Arif Rahman",
      role: "Backend Developer",
      location: "Dhaka, Bangladesh",
      image: "/placeholder.svg",
      bio: "Backend architecture specialist with expertise in scalable systems and databases.",
      skills: ["Node.js", "Express", "MongoDB", "API Design"],
      social: {
        github: "#",
        linkedin: "#",
        email: "arif@beglagency.com"
      }
    },
    {
      name: "Sakib Khan",
      role: "Mobile App Developer",
      location: "Sylhet, Bangladesh",
      image: "/placeholder.svg",
      bio: "Cross-platform mobile development expert creating native and web-based mobile solutions.",
      skills: ["React Native", "Flutter", "Mobile UI", "App Store"],
      social: {
        github: "#",
        linkedin: "#",
        email: "sakib@beglagency.com"
      }
    },
    {
      name: "Tanvir Ahmed",
      role: "DevOps Engineer",
      location: "Dhaka, Bangladesh",
      image: "/placeholder.svg",
      bio: "Infrastructure and deployment specialist ensuring reliable, scalable application hosting.",
      skills: ["AWS", "Docker", "CI/CD", "Monitoring"],
      social: {
        github: "#",
        linkedin: "#",
        email: "tanvir@beglagency.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-brand-gray-50 via-white to-brand-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-brand-gray-900 mb-6 font-poppins">
              Meet Our <span className="text-gradient">Expert Team</span>
            </h1>
            <p className="text-xl text-brand-gray-600 leading-relaxed mb-8">
              A globally distributed team of passionate developers and strategists dedicated to 
              delivering exceptional web applications for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white border border-brand-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {/* Profile Image */}
                  <div className="aspect-square bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Basic Info */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-brand-gray-900 mb-1 font-poppins">
                        {member.name}
                      </h3>
                      <p className="text-brand-primary font-semibold mb-2">{member.role}</p>
                      <p className="text-sm text-brand-gray-500">{member.location}</p>
                    </div>

                    {/* Bio */}
                    <p className="text-brand-gray-600 text-sm leading-relaxed mb-6 text-center">
                      {member.bio}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-brand-gray-900 mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-brand-gray-100 text-brand-gray-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      {member.social.github && (
                        <a 
                          href={member.social.github}
                          className="w-8 h-8 bg-brand-gray-100 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a 
                          href={member.social.linkedin}
                          className="w-8 h-8 bg-brand-gray-100 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      <a 
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 bg-brand-gray-100 rounded-full flex items-center justify-center hover:bg-brand-primary hover:text-white transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-poppins">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              We're always looking for talented developers and creative minds to join our global team.
            </p>
            <a 
              href="/careers"
              className="inline-flex items-center bg-white text-brand-primary hover:bg-brand-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
