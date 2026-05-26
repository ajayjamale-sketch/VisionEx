import { useScrollTop } from '@/hooks/useScrollTop';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Heart, GraduationCap, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const JOBS = [
  { id: '1', title: 'Senior AI Research Engineer', dept: 'Engineering', loc: 'San Francisco, CA / Remote', type: 'Full-time' },
  { id: '2', title: 'Senior Frontend Developer (React)', dept: 'Engineering', loc: 'San Francisco, CA', type: 'Full-time' },
  { id: '3', title: 'Enterprise Account Executive', dept: 'Sales', loc: 'New York, NY / Hybrid', type: 'Full-time' },
  { id: '4', title: 'Industrial AI Product Manager', dept: 'Product', loc: 'San Francisco, CA', type: 'Full-time' },
  { id: '5', title: 'Technical Support Engineer', dept: 'Customer Success', loc: 'Remote (GMT-5 to GMT+2)', type: 'Full-time' },
];

export default function Careers() {
  useScrollTop();
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const filteredJobs = selectedDept === 'All' 
    ? JOBS 
    : JOBS.filter(job => job.dept === selectedDept);

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            <Briefcase className="w-3.5 h-3.5" /> We are Hiring!
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Shape the Future of<br />
            <span className="text-gradient-indigo-cyan">Visual Intelligence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Help us build AI models, edge hardware daemons, and cloud infrastructures that empower thousands of companies to see and automate their operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#open-roles" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              View Open Roles
            </a>
          </div>
        </div>
      </section>

      {/* 2. Culture & Values */}
      <section className="py-16 bg-muted/10 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Our Core Pillars</h2>
            <p className="text-muted-foreground">What shapes our decisions, engineering choices, and workplace relationship rules.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: 'Inclusivity & Autonomy', desc: 'We support diverse viewpoints and provide complete autonomy to own projects from conception to release.' },
              { icon: Users, title: 'Extreme Collaboration', desc: 'We solve hard computer vision problems as a unified team, fostering knowledge sharing and support.' },
              { icon: GraduationCap, title: 'Continuous Growth', desc: 'Get continuous training allowances, research sponsorships, and internal mentoring.' }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Workplace & Benefits */}
      <section className="py-16 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Designed for Best Performance</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At VisionEx, we believe exceptional engineers and builders thrive when they have the peace, resources, and trust to do their work.
              </p>
              <div className="space-y-4">
                {[
                  '100% remote-friendly setup with home office stipends',
                  'Premium health, dental, and vision insurance policies',
                  'Unlimited Paid Time Off (PTO) with a mandatory 3-week minimum',
                  'Competitive equity packages with quarterly refresh grants'
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-indigo-500/20 shadow-card-dark">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop" alt="Team Work" className="w-full h-80 object-cover" />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Open Positions List */}
      <section id="open-roles" className="py-16 bg-muted/10 border-t border-border scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Open Opportunities</h2>
            <p className="text-muted-foreground">Select a department to view available roles.</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['All', 'Engineering', 'Sales', 'Product', 'Customer Success'].map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${selectedDept === dept ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              >
                {dept}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div key={job.id} className="p-5 rounded-2xl bg-card border border-border hover:border-indigo-500/30 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-heading font-semibold text-foreground text-base">{job.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span>{job.dept}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-cyan-500" /> {job.loc}</span>
                      <span>·</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="px-4 py-2 text-xs font-semibold bg-muted text-muted-foreground rounded-lg hover:text-foreground hover:bg-muted/80 transition-colors self-stretch sm:self-auto text-center">
                    Apply Now
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm">No open positions in this department currently. See general application below.</div>
            )}
          </div>
        </div>
      </section>

      {/* 5. General Application CTA */}
      <section className="py-20 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Don't see your perfect position?</h2>
          <p className="text-muted-foreground mb-8">We are always searching for brilliant engineers, vision scientists, and product leaders. Submit your resume for future considerations.</p>
          <div className="flex justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
              Submit General Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
