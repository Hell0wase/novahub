import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Gamepad2, Zap, Shield, Smartphone } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Landing = () => {
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Students collaborating" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Learn, Chill,
            </span>
            <br />
            <span className="text-foreground">Connect.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
            The ultimate platform for students to collaborate, share notes, and have fun during study breaks. 
            Built for the modern learner.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-8 text-muted-foreground animate-fade-in">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">50K+</div>
              <div className="text-sm">Notes Shared</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to <span className="bg-gradient-primary bg-clip-text text-transparent">succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to enhance your learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by <span className="bg-gradient-primary bg-clip-text text-transparent">students</span> everywhere
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our community has to say about NovaHub
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students already using NovaHub to excel in their studies.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;