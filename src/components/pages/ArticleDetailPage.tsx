import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { Articles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Articles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<Articles>('articles', id);
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoadingSpinner />
            </div>
          ) : !article ? (
            <div className="text-center py-20">
              <h2 className="font-heading text-3xl text-deepbrown mb-4">Article Not Found</h2>
              <p className="font-paragraph text-lg text-secondary-foreground mb-8">
                The article you're looking for doesn't exist.
              </p>
              <Link 
                to="/news"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary font-paragraph px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <ArrowLeft size={20} />
                Back to Articles
              </Link>
            </div>
          ) : (
            <article className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <Link 
                  to="/news"
                  className="inline-flex items-center gap-2 font-paragraph text-primary hover:text-deepbrown transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back to Articles
                </Link>

                {article.sectionCategory && (
                  <span className="inline-block font-paragraph text-sm text-primary uppercase tracking-wider">
                    {article.sectionCategory}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-4xl lg:text-6xl text-deepbrown mb-6 leading-tight">
                {article.articleTitle}
              </h1>

              <div className="flex items-center gap-6 font-paragraph text-base text-secondary-foreground/70 mb-8 pb-8 border-b border-deepbrown/20">
                {article.authorName && (
                  <span className="font-semibold text-deepbrown">
                    By <Link 
                      to={`/author/${encodeURIComponent(article.authorName)}`}
                      className="text-primary hover:text-deepbrown transition-colors underline"
                    >
                      {article.authorName}
                    </Link>
                  </span>
                )}
                {article.publicationDate && (
                  <span>{format(new Date(article.publicationDate), 'MMMM d, yyyy')}</span>
                )}
              </div>

              {article.featuredImage && (
                <div className="relative overflow-hidden mb-12 aspect-[16/9]">
                  <Image 
                    src={article.featuredImage}
                    alt={article.articleTitle || 'Article image'}
                    className="w-full h-full object-cover"
                    width={1200}
                  />
                </div>
              )}

              {article.fullContent && (
                <div className="prose prose-lg max-w-none">
                  <div className="font-paragraph text-lg text-secondary-foreground leading-relaxed whitespace-pre-wrap">
                    {article.fullContent}
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
