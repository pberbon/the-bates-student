// HPI 1.7-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Articles } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRight, Newspaper, Mail, Calendar, ChevronRight } from 'lucide-react';

// --- Types ---
interface SectionLink {
  name: string;
  path: string;
  desc: string;
}

// --- Constants ---
const SECTIONS: SectionLink[] = [
  { name: 'News', path: '/news', desc: 'Campus updates & breaking stories' },
  { name: 'Features', path: '/features', desc: 'In-depth reporting & profiles' },
  { name: 'Forum', path: '/forum', desc: 'Opinion pieces & editorials' },
  { name: 'Arts & Leisure', path: '/arts', desc: 'Culture, arts, & entertainment' },
  { name: 'Sports', path: '/sports', desc: 'Athletic coverage & highlights' }
];

// --- Components ---

const SectionDivider = () => (
  <div className="w-full h-px bg-deepbrown/20" />
);

const VerticalDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-px bg-deepbrown/20 ${className}`} />
);

export default function HomePage() {
  // --- Data Fidelity: Canonical Sources ---
  const [featuredArticles, setFeaturedArticles] = useState<Articles[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Scroll Hooks for Parallax & Motion ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroParallaxY = useTransform(scrollYProgress, [0, 0.2], ["0%", "10%"]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  // --- Data Fetching (Preserved Logic) ---
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Articles>('articles', {}, { limit: 6 });
      setFeaturedArticles(result.items);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Helper for Grid Animation ---
  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-paragraph selection:bg-primary/20 selection:text-deepbrown overflow-clip">
      <Header />

      {/* --- HERO SECTION: Inspiration Image Replica --- */}
      {/* Structure: Split Layout. Left: Text + Subgrid. Right: Full Height Image. */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[92vh] flex flex-col lg:grid lg:grid-cols-12 border-b border-deepbrown/20">
        
        {/* Left Column: Content & Subgrid */}
        <div className="col-span-1 lg:col-span-7 flex flex-col border-r border-deepbrown/20 relative">
          
          {/* Main Text Area */}
          <div className="flex-1 p-8 lg:p-16 flex flex-col justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="block font-heading text-primary text-lg mb-4 tracking-wide">Est. 1873</span>
              <h1 className="font-heading text-6xl lg:text-8xl text-deepbrown leading-[0.95] mb-8 tracking-tight">
                The Bates <br />
                <span className="italic font-light">Student</span>
              </h1>
              <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/80 max-w-md mb-10 leading-relaxed">
                The independent voice of the campus community. Uncovering truth, celebrating culture, and fostering dialogue since 1873.
              </p>
              <Link 
                to="/news"
                className="group inline-flex items-center gap-3 text-deepbrown font-medium text-lg hover:text-primary transition-colors"
              >
                <span className="border-b border-deepbrown group-hover:border-primary transition-colors pb-0.5">Read Today's Edition</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Bottom Sub-Grid (Replica of Inspiration Bottom-Left Quadrant) */}
          <div className="h-auto lg:h-64 grid grid-cols-1 md:grid-cols-3 border-t border-deepbrown/20">
            {/* Cell 1: Text */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-deepbrown/20 flex flex-col justify-between bg-background hover:bg-secondary/50 transition-colors duration-500">
              <p className="font-heading text-xl text-deepbrown leading-tight">
                "Democracy dies in darkness, but thrives in the quad."
              </p>
              <span className="text-xs uppercase tracking-widest text-primary mt-4">Editorial Board</span>
            </div>
            
            {/* Cell 2: Image */}
            <div className="relative border-b md:border-b-0 md:border-r border-deepbrown/20 overflow-hidden group h-64 lg:h-auto">
              <div className="absolute inset-0 bg-deepbrown/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
              <Image 
                src="https://static.wixstatic.com/media/88c4f4_e19e5d74d39842a682b425d65766d0c1~mv2.png?originWidth=1152&originHeight=768"
                alt="Campus detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                width={400}
              />
            </div>

            {/* Cell 3: Image/Texture */}
            <div className="relative overflow-hidden group h-64 lg:h-auto">
               <div className="absolute inset-0 bg-primary/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
               <Image 
                src="https://static.wixstatic.com/media/88c4f4_82291eeabf094f7cbb6edb6e767bbaec~mv2.png?originWidth=1152&originHeight=768"
                alt="Texture"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                width={400}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image (Parallax) */}
        <div className="col-span-1 lg:col-span-5 relative overflow-hidden min-h-[50vh] lg:min-h-auto">
          <motion.div 
            style={{ y: heroParallaxY, scale: heroScale }}
            className="absolute inset-0 w-full h-[120%]"
          >
            <Image 
              src="https://static.wixstatic.com/media/88c4f4_db86e86691264ce59caa3bf4f7e7b87c~mv2.png?originWidth=1152&originHeight=768"
              alt="Bates Campus Life"
              className="w-full h-full object-cover"
              width={1200}
            />
          </motion.div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-deepbrown/40 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* --- TICKER SECTION --- */}
      <div className="w-full border-b border-deepbrown/20 bg-deepbrown text-background overflow-hidden py-4">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-sm uppercase tracking-[0.2em]">Breaking News</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm uppercase tracking-[0.2em]">Campus Life</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm uppercase tracking-[0.2em]">Sports Highlights</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm uppercase tracking-[0.2em]">Arts & Culture</span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURED STORIES (Asymmetrical Grid) --- */}
      <section className="w-full max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          
          {/* Sticky Sidebar Title */}
          <div className="col-span-1 lg:col-span-2 border-r border-deepbrown/20 p-8 lg:sticky lg:top-0 lg:h-screen bg-background z-10 hidden lg:flex flex-col justify-between">
            <div>
              <h2 className="font-heading text-4xl text-deepbrown mb-2">Latest<br/>Stories</h2>
              <div className="w-12 h-1 bg-primary mt-4" />
            </div>
            <div className="text-sm text-secondary-foreground/60 font-paragraph">
              Curated selection of this week's top reporting.
            </div>
          </div>

          {/* Mobile Title */}
          <div className="lg:hidden p-8 border-b border-deepbrown/20">
             <h2 className="font-heading text-4xl text-deepbrown">Latest Stories</h2>
          </div>

          {/* Content Grid */}
          <div className="col-span-1 lg:col-span-10">
            {isLoading ? (
              <div className="p-20 text-center font-heading text-2xl text-deepbrown/50 animate-pulse">Loading the press...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {featuredArticles.map((article, index) => {
                  // First article is featured (larger)
                  const isFirst = index === 0;
                  return (
                    <motion.article
                      key={article._id}
                      custom={index}
                      variants={gridItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className={`
                        group relative border-b border-deepbrown/20 
                        ${isFirst ? 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2 border-r' : 'col-span-1 border-r'}
                        bg-background hover:bg-secondary/30 transition-colors duration-500
                      `}
                    >
                      <Link to={`/article/${article._id}`} className="block h-full flex flex-col">
                        <div className={`relative overflow-hidden ${isFirst ? 'aspect-[16/9]' : 'aspect-[4/3]'} w-full`}>
                          <Image 
                            src={article.featuredImage || 'https://static.wixstatic.com/media/88c4f4_81bcac571c2c46119502775003057682~mv2.png?originWidth=1152&originHeight=576'}
                            alt={article.articleTitle || 'Article'}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            width={isFirst ? 1200 : 600}
                          />
                          {article.sectionCategory && (
                            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-deepbrown/10">
                              {article.sectionCategory}
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 text-xs text-secondary-foreground/60 mb-3 font-medium uppercase tracking-wide">
                              {article.publicationDate && (
                                <span>{format(new Date(article.publicationDate), 'MMMM d, yyyy')}</span>
                              )}
                              {article.authorName && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-primary" />
                                  <span>{article.authorName}</span>
                                </>
                              )}
                            </div>
                            <h3 className={`font-heading text-deepbrown group-hover:text-primary transition-colors ${isFirst ? 'text-3xl lg:text-4xl leading-tight' : 'text-xl lg:text-2xl'}`}>
                              {article.articleTitle}
                            </h3>
                            {isFirst && article.fullContent && (
                              <p className="mt-4 text-secondary-foreground/80 line-clamp-3 text-lg">
                                {article.fullContent.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                              </p>
                            )}
                          </div>
                          
                          <div className="mt-6 flex items-center text-sm font-medium text-deepbrown group-hover:translate-x-2 transition-transform duration-300">
                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            )}
            
            {/* View All Link Block */}
            {!isLoading && (
              <div className="p-12 border-b border-r border-deepbrown/20 flex justify-center items-center bg-secondary/20">
                <Link 
                  to="/news"
                  className="group relative px-8 py-4 overflow-hidden border border-deepbrown text-deepbrown font-heading text-xl transition-all hover:text-background"
                >
                  <span className="absolute inset-0 w-full h-full bg-deepbrown transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    View All Archives <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- SECTIONS NAVIGATION (Interactive Accordion-like) --- */}
      <section className="w-full bg-deepbrown text-background py-24 px-6 lg:px-12 overflow-hidden relative">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#F9F6F1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        </div>

        <div className="max-w-[120rem] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 border-b border-white/10 pb-8">
            <h2 className="font-heading text-5xl lg:text-7xl">Explore Sections</h2>
            <p className="text-white/60 max-w-md mt-6 lg:mt-0 text-lg">
              Dive into the diverse voices and topics that shape our campus conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
            {SECTIONS.map((section, idx) => (
              <Link 
                key={section.path}
                to={section.path}
                className="group relative bg-deepbrown p-8 h-64 lg:h-96 flex flex-col justify-between overflow-hidden hover:bg-[#463226] transition-colors duration-500"
              >
                <div className="relative z-10">
                  <span className="text-xs font-mono text-primary mb-2 block">0{idx + 1}</span>
                  <h3 className="font-heading text-2xl lg:text-3xl text-background group-hover:text-primary transition-colors">
                    {section.name}
                  </h3>
                </div>
                
                <div className="relative z-10 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  <p className="text-sm text-white/70 mb-4">{section.desc}</p>
                  <span className="inline-flex items-center text-primary text-sm font-bold uppercase tracking-wider">
                    Browse <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>

                {/* Hover Decoration */}
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER & PRINT ISSUES (Static Split Section) --- */}
      <section className="w-full max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-2 border-b border-deepbrown/20">
        
        {/* Newsletter */}
        <div className="relative group border-b lg:border-b-0 lg:border-r border-deepbrown/20 overflow-hidden">
          <div className="absolute inset-0 bg-secondary/50 group-hover:bg-secondary transition-colors duration-500" />
          <div className="relative z-10 p-12 lg:p-24 flex flex-col items-start h-full">
            <div className="w-16 h-16 rounded-full border border-deepbrown/20 flex items-center justify-center mb-8 bg-background text-primary">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-4xl text-deepbrown mb-4">The Weekly Dispatch</h3>
            <p className="font-paragraph text-lg text-secondary-foreground/70 mb-8 max-w-md">
              Get the top stories, upcoming events, and editor's picks delivered straight to your inbox every Friday morning.
            </p>
            <Link 
              to="/newsletter" 
              className="mt-auto inline-flex items-center gap-3 px-6 py-3 bg-deepbrown text-background hover:bg-primary transition-colors duration-300"
            >
              Subscribe Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Print Issues */}
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-background group-hover:bg-secondary/30 transition-colors duration-500" />
          <div className="relative z-10 p-12 lg:p-24 flex flex-col items-start h-full">
            <div className="w-16 h-16 rounded-full border border-deepbrown/20 flex items-center justify-center mb-8 bg-background text-primary">
              <Newspaper className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-4xl text-deepbrown mb-4">Print Archives</h3>
            <p className="font-paragraph text-lg text-secondary-foreground/70 mb-8 max-w-md">
              Experience journalism in its classic form. Browse our digital library of past print editions dating back to 2010.
            </p>
            <Link 
              to="/print-issues" 
              className="mt-auto inline-flex items-center gap-3 px-6 py-3 border border-deepbrown text-deepbrown hover:bg-deepbrown hover:text-background transition-colors duration-300"
            >
              Browse Issues <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- ABOUT / MISSION (Typography Focus) --- */}
      <section className="w-full max-w-[120rem] mx-auto py-32 px-6 lg:px-12 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl lg:text-7xl text-deepbrown mb-12 leading-tight">
              "To inform, to challenge, and to connect the campus community."
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-12" />
            <p className="font-paragraph text-xl text-secondary-foreground/80 leading-relaxed mb-12">
              The Bates Student is an entirely student-run publication dedicated to maintaining the highest standards of journalistic integrity. We believe in the power of the written word to spark change and foster understanding.
            </p>
            <Link 
              to="/about"
              className="text-primary font-bold text-lg hover:text-deepbrown transition-colors border-b-2 border-primary hover:border-deepbrown pb-1"
            >
              Read Our Full Mission Statement
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-deepbrown/10 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-deepbrown/10 translate-x-1/2 translate-y-1/2" />
      </section>

      <Footer />
    </div>
  );
}