import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { SearchOverlay } from '@/components/ui/search-overlay';
import { PhoneCall, Mail, Type, Sun, Menu, Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const isActive = (path: string) => location === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar with contact info and accessibility options */}
      <div className="bg-secondary text-white px-4 py-1 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:+625113304583" className="hover:underline flex items-center">
              <PhoneCall className="w-3 h-3 mr-1" /> (0511) 3304583
            </a>
            <a href="mailto:info@kalselprov.go.id" className="hover:underline hidden sm:flex items-center">
              <Mail className="w-3 h-3 mr-1" /> info@kalselprov.go.id
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              aria-label="Perbesar Ukuran Teks" 
              className="text-xs hover:bg-secondary-light px-2 py-1 rounded"
            >
              <Type className="w-3 h-3 inline mr-1" /> A+
            </button>
            <button 
              aria-label="Tampilan Kontras Tinggi" 
              className="text-xs hover:bg-secondary-light px-2 py-1 rounded"
            >
              <Sun className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main header with logo and navigation */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <img 
            src="https://placehold.co/70x70/F0B323/FFFFFF?text=Kalsel"
            alt="Lambang Provinsi Kalimantan Selatan" 
            className="h-14 w-auto mr-3" 
          />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-secondary">PEMERINTAH PROVINSI</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-secondary">KALIMANTAN SELATAN</h2>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-neutral-dark hover:text-secondary focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Navigation menu */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-1 space-y-2 md:space-y-0">
            <li>
              <Link 
                href="/"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link 
                href="/profile"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/profile') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Profil
              </Link>
            </li>
            <li>
              <Link 
                href="/government"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/government') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Pemerintahan
              </Link>
            </li>
            <li>
              <Link 
                href="/services"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/services') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Layanan Publik
              </Link>
            </li>
            <li>
              <Link 
                href="/news"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/news') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Berita
              </Link>
            </li>
            <li>
              <Link 
                href="/documents"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/documents') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Dokumen
              </Link>
            </li>
            <li>
              <Link 
                href="/contact"
                className={`block px-4 py-2 rounded hover:bg-neutral hover:text-secondary-dark font-medium
                  ${isActive('/contact') ? 'text-secondary' : 'text-neutral-dark'}`}
              >
                Kontak
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Search button */}
        <div className="hidden md:block">
          <Button 
            onClick={toggleSearch}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            <Search className="mr-2 h-4 w-4" /> Cari
          </Button>
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={toggleSearch} />
    </header>
  );
};

export default Header;
