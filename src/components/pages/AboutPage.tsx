import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<TeamMembers>('teammembers', {}, { limit: 50 });
      setTeamMembers(result.items);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      <main className="w-full max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        {/* About Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6">
                About The Bates Student
              </h1>
              <div className="space-y-4 font-paragraph text-lg text-secondary-foreground">
                <p>
                  The Bates Student is the independent student newspaper of Bates College, serving our community since 1873. For over a century, we have been committed to delivering accurate, timely, and engaging journalism that reflects the diverse voices and experiences of our campus.
                </p>
                <p>
                  Our mission is to inform, engage, and inspire the Bates community through thoughtful reporting, compelling features, and meaningful dialogue. We cover everything from breaking news and campus events to in-depth investigations and cultural commentary.
                </p>
                <p>
                  As a student-run publication, we provide a platform for aspiring journalists, writers, photographers, and designers to develop their skills while contributing to the vibrant intellectual life of our college.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image 
                  src="https://static.wixstatic.com/media/88c4f4_11cfa8ade72b46be87528dcd9733a77f~mv2.png?originWidth=768&originHeight=576"
                  alt="The Bates Student newsroom"
                  className="w-full h-full object-cover"
                  width={800}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-20 bg-primary py-16 px-8 lg:px-12 -mx-6 lg:-mx-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-4xl text-primary-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Integrity',
                  desc: 'We uphold the highest standards of journalistic ethics and accuracy in all our reporting.'
                },
                {
                  title: 'Independence',
                  desc: 'We maintain editorial independence and report without fear or favor.'
                },
                {
                  title: 'Community',
                  desc: 'We serve as a voice for all members of the Bates community and foster meaningful dialogue.'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="font-heading text-2xl text-primary-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-paragraph text-base text-primary-foreground/90">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="mb-12">
            <h2 className="font-heading text-4xl lg:text-5xl text-deepbrown mb-4">
              Our Team
            </h2>
            <p className="font-paragraph text-lg text-secondary-foreground max-w-3xl">
              Meet the dedicated students who bring The Bates Student to life
            </p>
          </div>

          <div className="min-h-[400px]">
            {isLoading ? null : (
              <>
                {teamMembers.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {teamMembers.map((member, index) => (
                      <motion.article
                        key={member._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="bg-primary-foreground p-6"
                      >
                        {member.headshot && (
                          <div className="relative overflow-hidden mb-4 aspect-square">
                            <Image 
                              src={member.headshot}
                              alt={member.name || 'Team member'}
                              className="w-full h-full object-cover"
                              width={400}
                            />
                          </div>
                        )}
                        
                        <h3 className="font-heading text-2xl text-deepbrown mb-2">
                          {member.name}
                        </h3>
                        
                        {member.role && (
                          <p className="font-paragraph text-sm text-primary uppercase tracking-wider mb-3">
                            {member.role}
                          </p>
                        )}
                        
                        {member.bio && (
                          <p className="font-paragraph text-base text-secondary-foreground mb-4">
                            {member.bio}
                          </p>
                        )}
                        
                        {member.socialMediaLink && (
                          <a
                            href={member.socialMediaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-paragraph text-sm text-primary hover:text-deepbrown transition-colors"
                          >
                            Connect
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </motion.article>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-20">
                    <p className="font-paragraph text-xl text-secondary-foreground">
                      Team information coming soon.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
