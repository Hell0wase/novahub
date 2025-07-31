import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Gamepad2, Zap, Shield, Smartphone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-image.jpg';

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const features = [
    {
      icon: BookOpen,
      title: 'Smart Notes',
      description: 'Collaborative note-taking with markdown support and real-time sync.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with classmates, share knowledge, and build study groups.'
    },
    {
      icon: Gamepad2,
      title: 'Fun Zone',
      description: 'Unwind with educational games during your study breaks.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant loading and smooth animations.'
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your data is protected with enterprise-grade security.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Ready',
      description: 'Works perfectly on all devices - desktop, tablet, and mobile.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Computer Science Student',
      content: 'NovaHub has revolutionized how I study. The collaborative features are amazing!'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Engineering Student',
      content: 'Finally, a platform that combines productivity with fun. Love the games section!'
    },
    {
      name: 'Emma Thompson',
      role: 'Design Student',
      content: 'The interface is so clean and intuitive. Makes studying actually enjoyable.'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating-animation" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Students collaborating" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 slide-in-up">
            <span className="gradient-text block mb-2">
              Learn, Chill,
            </span>
            <span className="text-foreground neon-glow inline-block px-4 py-2 rounded-lg">Connect.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto slide-in-up glass-card p-6 rounded-xl" style={{ animationDelay: '0.2s' }}>
            The ultimate platform for students to collaborate, share notes, and have fun during study breaks. 
            Built for the modern learner with cutting-edge technology.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center zoom-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6 neon-glow pulse-glow rounded-full">
                  🚀 Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-12 py-6 glass-card border-primary/30 hover:border-primary rounded-full">
                  ✨ Sign In
                </Button>
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="zoom-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-12 py-6 neon-glow pulse-glow rounded-full">
                  🎓 Go to Dashboard
                </Button>
              </Link>
            </div>
          )}
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 slide-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center glass-card p-6 rounded-xl neon-glow">
              <div className="text-3xl font-bold gradient-text">10K+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center glass-card p-6 rounded-xl neon-glow">
              <div className="text-3xl font-bold gradient-text">50K+</div>
              <div className="text-sm text-muted-foreground">Notes Shared</div>
            </div>
            <div className="text-center glass-card p-6 rounded-xl neon-glow">
              <div className="text-3xl font-bold gradient-text">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything you need to <span className="gradient-text">succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto glass-card p-4 rounded-xl">
              Powerful features designed to enhance your learning experience with cutting-edge technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass-card border-primary/20 hover:border-primary/50 transition-all duration-500 group zoom-in hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 neon-glow">
                      <Icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 gradient-text">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 slide-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by <span className="gradient-text">students</span> everywhere
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto glass-card p-4 rounded-xl">
              See what our community has to say about NovaHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-500 zoom-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 opacity-50">"</div>
                  <p className="text-muted-foreground mb-6 italic leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center neon-glow">
                      <span className="text-white font-bold">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold gradient-text">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl floating-animation" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl floating-animation" style={{ animationDelay: '2s' }} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 slide-in-up">
              Ready to transform your learning?
            </h2>
            <p className="text-xl text-white/90 mb-10 slide-in-up glass-card p-6 rounded-xl inline-block" style={{ animationDelay: '0.2s' }}>
              Join thousands of students already using NovaHub to excel in their studies with cutting-edge technology.
            </p>
            <div className="zoom-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-6 neon-glow pulse-glow rounded-full font-bold">
                  🎓 Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Landing;