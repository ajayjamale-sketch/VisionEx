import { useState } from 'react';
import { useScrollTop } from '@/hooks/useScrollTop';
import { BLOG_POSTS } from '@/constants/data';
import { Clock, ArrowRight, Search } from 'lucide-react';

const CATEGORIES = ['All', 'Manufacturing', 'Security', 'Technology', 'AI & ML', 'Smart Cities', 'Compliance'];

export default function Blog() {
  useScrollTop();
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = BLOG_POSTS.filter(p => {
    const matchesCat = active === 'All' || p.category === active;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page-transition min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 text-xs font-medium mb-6">
            VisionEx Blog
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Insights on <span className="text-gradient-indigo-cyan">AI Vision</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Deep dives, case studies, and technical guides on computer vision, video analytics, and enterprise AI.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${active === cat ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {filtered.length > 0 && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-border bg-card hover:border-indigo-500/30 transition-all duration-200 group">
              <div className="grid lg:grid-cols-2">
                <div className="relative overflow-hidden">
                  <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-56 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">{filtered[0].category}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span>{filtered[0].author}</span>
                    <span>·</span>
                    <span>{filtered[0].date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{filtered[0].readTime}</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-indigo-400 transition-colors">{filtered[0].title}</h2>
                  <p className="text-muted-foreground mb-5 leading-relaxed">{filtered[0].excerpt}</p>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(1).map(post => (
              <div key={post.id} className="rounded-2xl overflow-hidden border border-border bg-card hover:border-indigo-500/30 transition-all duration-200 group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.author}</span>
                    <button className="text-xs text-indigo-400 flex items-center gap-1 hover:text-indigo-300 transition-colors">Read <ArrowRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-heading font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-indigo-600/10 to-cyan-500/10 border-t border-indigo-500/20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Stay ahead in AI Vision</h2>
          <p className="text-muted-foreground mb-6 text-sm">Weekly insights on computer vision, industry trends, and VisionEx product updates.</p>
          <form onSubmit={e => { e.preventDefault(); }} className="flex gap-2">
            <input type="email" placeholder="your@company.com"
              className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
            <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-glow-indigo transition-all duration-300 text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
