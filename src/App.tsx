import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Zap, 
  Globe, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Code,
  Server,
  AlertTriangle,
  Star,
  Quote,
  Building2,
  Award
} from 'lucide-react';
import LoginPage from './components/LoginPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showLoginPage, setShowLoginPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Shield,
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities before attackers do.",
      features: ["Web Application Testing", "Network Security", "Social Engineering"]
    },
    {
      icon: Lock,
      title: "Security Consulting",
      description: "Strategic cybersecurity guidance to build robust defense mechanisms.",
      features: ["Risk Assessment", "Compliance Audits", "Security Architecture"]
    },
    {
      icon: Eye,
      title: "Threat Monitoring",
      description: "24/7 surveillance and rapid response to emerging security threats.",
      features: ["Real-time Monitoring", "Incident Response", "Threat Intelligence"]
    },
    {
      icon: Code,
      title: "Secure Development",
      description: "Build security into your applications from the ground up.",
      features: ["Code Review", "DevSecOps", "Security Training"]
    }
  ];

  const stats = [
    { number: "500+", label: "Security Audits" },
    { number: "99.9%", label: "Uptime Guaranteed" },
    { number: "24/7", label: "Threat Monitoring" },
    { number: "15min", label: "Response Time" }
  ];

  const clients = [
    {
      name: "Meridian Systems",
      country: "Canada",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Technology"
    },
    {
      name: "Alpine Financial",
      country: "Switzerland",
      logo: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Banking"
    },
    {
      name: "Nordic Solutions",
      country: "Sweden",
      logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Consulting"
    },
    {
      name: "Coastal Dynamics",
      country: "Australia",
      logo: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Manufacturing"
    },
    {
      name: "Pinnacle Group",
      country: "Belgium",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Logistics"
    },
    {
      name: "Vertex Technologies",
      country: "Singapore",
      logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Software"
    },
    {
      name: "Horizon Enterprises",
      country: "New Zealand",
      logo: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Energy"
    },
    {
      name: "Summit Corp",
      country: "Ireland",
      logo: "https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      industry: "Healthcare"
    }
  ];

  const partnerships = [
    {
      name: "Google Cloud",
      logo: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=150&h=80&fit=crop",
      description: "Strategic Cloud Security Partner"
    },
    {
      name: "SAP",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=80&fit=crop",
      description: "Enterprise Security Solutions"
    },
    {
      name: "Cognizant",
      logo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150&h=80&fit=crop",
      description: "Digital Transformation Security"
    }
  ];

  const testimonials = [
    {
      name: "Michael Thompson",
      position: "IT Director, Meridian Systems",
      company: "Meridian Systems",
      country: "Canada",
      content: "Lex Technologies transformed our security infrastructure completely. Their comprehensive approach to threat detection and response has significantly improved our security posture. The team's expertise is unmatched.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
    },
    {
      name: "Sarah Chen",
      position: "Security Manager, Alpine Financial",
      company: "Alpine Financial",
      country: "Switzerland",
      content: "Working with Lex Technologies has been exceptional. Their rapid incident response and proactive monitoring helped us prevent several potential breaches. Their expertise in financial sector security is outstanding.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
    },
    {
      name: "Erik Larsson",
      position: "CTO, Nordic Solutions",
      company: "Nordic Solutions",
      country: "Sweden",
      content: "The penetration testing services provided by Lex Technologies revealed critical vulnerabilities we never knew existed. Their detailed reports and remediation guidance helped us strengthen our entire security framework.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
    },
    {
      name: "Emma Rodriguez",
      position: "Head of IT Security, Coastal Dynamics",
      company: "Coastal Dynamics",
      country: "Australia",
      content: "Lex Technologies' secure development practices have been instrumental in building our new digital platform. Their DevSecOps approach ensures security is integrated from the very beginning of our development process.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
    }
  ];

  if (showLoginPage) {
    return <LoginPage onBack={() => setShowLoginPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-gray-900/95 backdrop-blur-lg border-b border-green-500/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Lex Technologies
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="hover:text-green-400 transition-colors">Services</a>
              <a href="#clients" className="hover:text-green-400 transition-colors">Clients</a>
              <a href="#about" className="hover:text-green-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-green-400 transition-colors">Contact</a>
              <button className="bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded-lg hover:from-green-600 hover:to-cyan-600 transition-all">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-green-500/20">
            <div className="px-4 py-6 space-y-4">
              <a href="#services" className="block hover:text-green-400 transition-colors">Services</a>
              <a href="#clients" className="block hover:text-green-400 transition-colors">Clients</a>
              <a href="#about" className="block hover:text-green-400 transition-colors">About</a>
              <a href="#contact" className="block hover:text-green-400 transition-colors">Contact</a>
              <button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 px-4 py-2 rounded-lg hover:from-green-600 hover:to-cyan-600 transition-all">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Secure
              </span>
              <br />
              <span className="text-white">Your Digital Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional cybersecurity solutions that protect your business from evolving threats. 
              Stay ahead with advanced security strategies and 24/7 monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => setShowLoginPage(true)}
                className="group bg-gradient-to-r from-green-500 to-cyan-500 px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Security Audit</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-green-500/50 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-500/10 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce-slow">
          <div className="w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-bounce-slow delay-1000">
          <div className="w-3 h-3 bg-cyan-400 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions tailored to protect your business 
              from the most sophisticated threats.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 rounded-xl p-8 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-lg group-hover:from-green-500/30 group-hover:to-cyan-500/30 transition-all">
                    <service.icon className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold ml-4">{service.title}</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-400">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Strategic Partnerships
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Collaborating with industry leaders to deliver cutting-edge security solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerships.map((partner, index) => (
              <div 
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 rounded-xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-24 h-12 mx-auto mb-6 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                <p className="text-gray-400">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Trusted by Global Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Companies worldwide trust us to protect their digital assets and secure their operations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 rounded-xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={client.logo} 
                    alt="Company"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{client.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{client.country}</p>
                <p className="text-xs text-green-400">{client.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                What Our Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real feedback from security leaders who trust Lex Technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 rounded-xl p-8 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-green-400 mb-4" />
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                    <p className="text-xs text-green-400">{testimonial.company}, {testimonial.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Why Choose Lex Technologies?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're not just another cybersecurity company. We're your digital guardians, 
                combining cutting-edge technology with deep expertise to create impenetrable 
                defense systems.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
                    <p className="text-gray-400">Certified security professionals with years of hands-on experience.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Rapid Response</h3>
                    <p className="text-gray-400">15-minute response time for critical security incidents.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Globe className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                    <p className="text-gray-400">Protecting businesses worldwide with localized expertise.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 border border-gray-600">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-green-400">System Status</span>
                    <span className="flex items-center text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Secure
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-cyan-400">Threat Level</span>
                    <span className="text-cyan-400">Low</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-yellow-400">Active Monitoring</span>
                    <span className="text-yellow-400">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Secure Your Business?
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't wait for a security breach. Contact us today for a comprehensive 
              security assessment and protect your digital assets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <Mail className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-400">soc@lexcyberwall.com</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <Phone className="h-8 w-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-400">+91 22 4567 8900</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <MapPin className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-400">Crescent Business Park<br />Khairani Road, Andheri East<br />Mumbai, Maharashtra - 400072</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-green-500 to-cyan-500 px-12 py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-cyan-600 transition-all transform hover:scale-105">
              Get Free Security Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-green-400" />
                <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Lex Technologies
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner in cybersecurity, protecting businesses 
                from digital threats with advanced security solutions.
              </p>
              <div className="text-sm text-gray-500">
                <p>Crescent Business Park, Khairani Road</p>
                <p>Andheri East, Mumbai, Maharashtra - 400072</p>
                <p>Email: soc@lexcyberwall.com</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Penetration Testing</li>
                <li>Security Consulting</li>
                <li>Threat Monitoring</li>
                <li>Secure Development</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Lex Technologies. All rights reserved. Securing the digital world, one byte at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;