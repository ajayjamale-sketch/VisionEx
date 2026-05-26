import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Users, Target, Globe, Award, ArrowRight } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const TEAM = [
  { name: 'Dr. Elena Zhang', role: 'CEO & Co-founder', bio: 'Former AI Research Lead at NVIDIA. PhD in Computer Vision from MIT.', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face' },
  { name: 'Marcus Reid', role: 'CTO & Co-founder', bio: 'Previously Principal Engineer at Palantir. 15 years in distributed AI systems.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Sarah Kim', role: 'VP of Product', bio: 'Former Product Director at AWS Computer Vision. Expert in enterprise AI UX.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  { name: 'James Okafor', role: 'VP of Engineering', bio: 'Full-stack AI systems architect with background in real-time video processing.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Dr. Priya Nair', role: 'Head of AI Research', bio: 'Deep learning researcher specializing in object detection and image segmentation.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' },
  { name: 'Alex Müller', role: 'VP of Sales', bio: 'Built enterprise sales organizations at Splunk and Datadog across EMEA.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
];

const VALUES = [
  { icon: Target, title: 'Precision First', desc: 'We build AI that enterprise teams can trust. Every model is rigorously tested for accuracy, reliability, and fairness before deployment.' },
  { icon: Globe, title: 'Global Impact', desc: 'Our technology helps make cities safer, factories more efficient, and businesses more intelligent — at scale, around the world.' },
  { icon: Users, title: 'Customer Obsessed', desc: 'We co-build solutions with our customers. Our product roadmap is shaped by the real operational challenges of enterprise teams.' },
  { icon: Award, title: 'Ethical AI', desc: 'We believe AI vision must be deployed responsibly. We adhere to privacy-by-design principles and industry compliance standards.' },
];

export default function About() {
  useScrollTop();

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-6">
            Our Story
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Building the future of{' '}
            <span className="text-gradient-indigo-cyan">visual intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
            VisionEx was founded in 2021 by a team of AI researchers and enterprise software engineers who believed that computer vision was too complex and inaccessible for most organizations. We set out to change that.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { val: 500, suf: '+', label: 'Enterprise Clients' },
              { val: 50, suf: 'M+', label: 'Daily Detections' },
              { val: 42, suf: '', label: 'Countries' },
              { val: 120, suf: '+', label: 'Team Members' },
            ].map(({ val, suf, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold font-heading text-gradient-indigo-cyan">
                  <AnimatedCounter end={val} suffix={suf} />
                </div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe every organization should have access to powerful AI vision — regardless of team size or technical resources. Our mission is to make visual intelligence as easy to deploy as setting up a web application.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From single-site manufacturers to global enterprises with thousands of cameras, VisionEx provides the infrastructure, models, and tooling to turn visual data into actionable intelligence.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
                Join Our Journey <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="VisionEx Team"
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">World-class experts from NVIDIA, Palantir, AWS, and top research institutions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200 group">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-indigo-500/20 group-hover:border-cyan-500/40 transition-colors"
                />
                <h3 className="font-heading font-semibold text-foreground">{member.name}</h3>
                <div className="text-xs font-medium text-indigo-400 mb-2">{member.role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investors */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Backed By The Best</h2>
          <p className="text-muted-foreground mb-12">Series B funded. Investors include some of the world's leading technology venture firms.</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['Sequoia Capital', 'Andreessen Horowitz', 'Y Combinator', 'General Catalyst', 'NVIDIA Ventures'].map(name => (
              <span key={name} className="font-heading font-bold text-foreground text-lg">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Ready to transform your visual operations?</h2>
          <p className="text-muted-foreground mb-8">Join 500+ enterprise teams. Start your free 14-day trial today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan hover:scale-105 transition-all duration-300">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
