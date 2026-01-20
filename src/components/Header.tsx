import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-secondary border-b border-primary/20">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-6">
          <Link to="/" className="font-heading text-2xl lg:text-3xl text-primary font-bold">
            The Bates Student
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/news" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/news') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              News
            </Link>
            <Link 
              to="/features" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/features') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/forum" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/forum') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              Forum
            </Link>
            <Link 
              to="/arts" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/arts') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              Arts & Leisure
            </Link>
            <Link 
              to="/sports" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/sports') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              Sports
            </Link>
            <Link 
              to="/newsletters" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/newsletters') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              Latest Newsletter
            </Link>
            <Link 
              to="/print-issues" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/print-issues') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              Print Issues
            </Link>
            <Link 
              to="/about" 
              className={`font-paragraph text-base transition-colors ${
                isActive('/about') ? 'text-primary font-semibold' : 'text-secondary-foreground hover:text-primary'
              }`}
            >
              About Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
