import { useParams, Link } from 'react-router-dom';
import { useScrollTop } from '@/hooks/useScrollTop';
import { BLOG_POSTS } from '@/constants/data';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';

export default function BlogDetail() {
  useScrollTop();
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Post not found</h1>
        <Link to="/blog" className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen bg-background flex flex-col">
      <main className="flex-1 pt-28 pb-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>

          <header className="mb-10 text-center">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 mb-6">
              {post.category}
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</div>
              <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</div>
              <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</div>
            </div>
          </header>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-border">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert max-w-3xl mx-auto prose-indigo prose-img:rounded-xl">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <p>
              Computer vision and AI are fundamentally transforming how enterprises operate, ensuring a high degree of precision, real-time analytics, and actionable intelligence that was previously impossible.
            </p>
            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Role of AI Vision</h2>
            <p>
              By leveraging advanced neural networks and deep learning models, VisionEx can identify defects on a production line, flag unauthorized personnel in restricted zones, or extract structured data from complex documents—all in real-time.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-6 text-muted-foreground">
              "VisionEx provides an unparalleled platform for real-time visual intelligence, turning raw video data into actionable insights instantly."
            </blockquote>
            <p>
              These implementations not only drive efficiency but also significantly reduce operational costs. Organizations can move from reactive monitoring to proactive event management.
            </p>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Implementation Strategies</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Identify key operational bottlenecks that can be solved with video analytics.</li>
              <li>Deploy robust edge computing infrastructure for low-latency processing.</li>
              <li>Train custom models on representative datasets for maximum accuracy.</li>
              <li>Integrate detection events directly into existing enterprise systems via Webhooks.</li>
            </ul>
            <p className="mt-6">
              Embracing AI vision is no longer an optional innovation; it is a critical component for maintaining competitive advantage in the modern enterprise landscape.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
}
