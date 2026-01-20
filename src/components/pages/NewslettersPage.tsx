import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { Newsletters } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';

export default function NewslettersPage() {
  const [newsletters, setNewsletters] = useState<Newsletters[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadNewsletters(0);
  }, []);

  const loadNewsletters = async (skipValue: number) => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Newsletters>('newsletters', {}, { limit: 12, skip: skipValue });
      
      if (skipValue === 0) {
        setNewsletters(result.items);
      } else {
        setNewsletters(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading newsletters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newSkip = skip + 12;
    setSkip(newSkip);
    loadNewsletters(newSkip);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
            Newsletter Archive
          </h1>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
            Access our complete collection of newsletters and stay connected with campus updates
          </p>
        </div>

        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {newsletters.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {newsletters.map((newsletter, index) => (
                    <motion.article
                      key={newsletter._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group bg-primary-foreground p-6 hover:shadow-lg transition-shadow"
                    >
                      {newsletter.thumbnailImage && (
                        <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                          <Image 
                            src={newsletter.thumbnailImage}
                            alt={newsletter.newsletterTitle || 'Newsletter thumbnail'}
                            className="w-full h-full object-cover"
                            width={600}
                          />
                        </div>
                      )}
                      
                      <h3 className="font-heading text-2xl text-deepbrown mb-3">
                        {newsletter.newsletterTitle}
                      </h3>
                      
                      {newsletter.dateSent && (
                        <p className="font-paragraph text-sm text-secondary-foreground/70 mb-3">
                          {format(new Date(newsletter.dateSent), 'MMMM d, yyyy')}
                        </p>
                      )}
                      
                      {newsletter.summary && (
                        <p className="font-paragraph text-base text-secondary-foreground mb-4">
                          {newsletter.summary}
                        </p>
                      )}
                      
                      {newsletter.newsletterLink && (
                        <a
                          href={newsletter.newsletterLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-paragraph text-primary hover:text-deepbrown transition-colors"
                        >
                          Read Newsletter
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-secondary-foreground">
                    No newsletters available yet.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {hasNext && !isLoading && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="border-2 border-deepbrown text-deepbrown font-paragraph px-8 py-3 hover:bg-deepbrown hover:text-primary-foreground transition-all"
            >
              Load More Newsletters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
