import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-deepbrown text-primary-foreground mt-24">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-xl mb-4">The Bates Student</h3>
            <p className="font-paragraph text-sm opacity-90">
              The independent student newspaper of Bates College since 1873.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/newsletters" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Newsletters
              </Link>
              <Link to="/print-issues" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Print Issues
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Sections</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/news" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                News
              </Link>
              <Link to="/features" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Features
              </Link>
              <Link to="/forum" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Forum
              </Link>
              <Link to="/arts" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Arts & Leisure
              </Link>
              <Link to="/sports" className="font-paragraph text-sm opacity-90 hover:opacity-100 transition-opacity">
                Sports
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <p className="font-paragraph text-sm text-center opacity-80">
            © {new Date().getFullYear()} The Bates Student. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
