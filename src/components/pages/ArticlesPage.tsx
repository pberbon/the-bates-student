import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Articles } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const SECTIONS = ['News', 'Features', 'Forum', 'Arts & Leisure', 'Sports'];

export default function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  
  const selectedSection = searchParams.get('section') || 'All';

  useEffect(() => {
    setSkip(0);
    loadArticles(0);
  }, [selectedSection]);

  const loadArticles = async (skipValue: number) => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Articles>('articles', {}, { limit: 12, skip: skipValue });
      
      let filteredItems = result.items;
      if (selectedSection !== 'All') {
        filteredItems = result.items.filter(article => 
          article.sectionCategory?.toLowerCase() === selectedSection.toLowerCase()
        );
      }
      
      if (skipValue === 0) {
        setArticles(filteredItems);
      } else {
        setArticles(prev => [...prev, ...filteredItems]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newSkip = skip + 12;
    setSkip(newSkip);
    loadArticles(newSkip);
  };

  const handleSectionChange = (section: string) => {
    if (section === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ section });
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="mb-12">
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
            All Articles
          </h1>
          <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
            Browse our complete collection of stories, features, and opinion pieces
          </p>
        </div>

        {/* Section Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-end">
          <button
            onClick={() => handleSectionChange('All')}
            className={`font-paragraph px-6 py-2 border-2 transition-all ${
              selectedSection === 'All'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-secondary-foreground border-deepbrown hover:bg-deepbrown hover:text-primary-foreground'
            }`}
          >
            All
          </button>
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => handleSectionChange(section)}
              className={`font-paragraph px-6 py-2 border-2 transition-all ${
                selectedSection === section
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-secondary-foreground border-deepbrown hover:bg-deepbrown hover:text-primary-foreground'
              }`}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="min-h-[600px]">
          {isLoading && skip === 0 ? null : (
            <>
              {articles.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {articles.map((article, index) => (
                    <motion.article
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group"
                    >
                      <Link to={`/article/${article._id}`}>
                        <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                          <Image 
                            src={article.featuredImage || 'https://static.wixstatic.com/media/88c4f4_52865c6647f94909a2ae30f8c1ad581a~mv2.png?originWidth=576&originHeight=448'}
                            alt={article.articleTitle || 'Article image'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            width={600}
                          />
                        </div>
                        
                        {article.sectionCategory && (
                          <span className="inline-block font-paragraph text-sm text-primary uppercase tracking-wider mb-2">
                            {article.sectionCategory}
                          </span>
                        )}
                        
                        <h3 className="font-heading text-2xl text-deepbrown mb-3 group-hover:text-primary transition-colors">
                          {article.articleTitle}
                        </h3>
                        
                        <div className="flex items-center gap-4 font-paragraph text-sm text-secondary-foreground/70">
                          {article.authorName && (
                            <Link 
                              to={`/author/${encodeURIComponent(article.authorName)}`}
                              className="text-primary hover:text-deepbrown transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {article.authorName}
                            </Link>
                          )}
                          {article.publicationDate && (
                            <span>{format(new Date(article.publicationDate), 'MMM d, yyyy')}</span>
                          )}
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-paragraph text-xl text-secondary-foreground">
                    No articles found in this section.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Load More */}
        {hasNext && !isLoading && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="border-2 border-deepbrown text-deepbrown font-paragraph px-8 py-3 hover:bg-deepbrown hover:text-primary-foreground transition-all"
            >
              Load More Articles
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
