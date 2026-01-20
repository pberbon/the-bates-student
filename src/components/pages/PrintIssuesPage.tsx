import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { PrintIssues } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';

export default function PrintIssuesPage() {
  const [printIssues, setPrintIssues] = useState<PrintIssues[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadPrintIssues(0);
  }, []);

  const loadPrintIssues = async (skipValue: number) => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<PrintIssues>('printissues', {}, { limit: 12, skip: skipValue });
      
      if (skipValue === 0) {
        setPrintIssues(result.items);
      } else {
        setPrintIssues(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading print issues:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newSkip = skip + 12;
    setSkip(newSkip);
    loadPrintIssues(newSkip);
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
            Print Issues Archive
          </h1>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
            Browse and download our complete collection of print editions
          </p>
        </div>

        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {printIssues.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {printIssues.map((issue, index) => (
                    <motion.article
                      key={issue._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group"
                    >
                      {issue.coverImage && (
                        <div className="relative overflow-hidden mb-4 aspect-[3/4] shadow-lg">
                          <Image 
                            src={issue.coverImage}
                            alt={issue.issueTitle || 'Print issue cover'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={400}
                          />
                        </div>
                      )}
                      
                      <h3 className="font-heading text-xl text-deepbrown mb-2">
                        {issue.issueTitle}
                      </h3>
                      
                      {issue.issueNumber && (
                        <p className="font-paragraph text-sm text-primary mb-2">
                          Issue #{issue.issueNumber}
                        </p>
                      )}
                      
                      {issue.publicationDate && (
                        <p className="font-paragraph text-sm text-secondary-foreground/70 mb-3">
                          {format(new Date(issue.publicationDate), 'MMMM yyyy')}
                        </p>
                      )}
                      
                      {issue.pdfLink && (
                        <a
                          href={issue.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-paragraph text-sm text-primary hover:text-deepbrown transition-colors"
                        >
                          Download PDF
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-secondary-foreground">
                    No print issues available yet.
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
              Load More Issues
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
