import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="https://placehold.co/70x70/FFFFFF/FFFFFF?text=Kalsel"
                alt="Lambang Provinsi Kalimantan Selatan" 
                className="h-14 w-auto mr-3 brightness-0 invert" 
              />
              <div>
                <h3 className="text-lg font-bold">PEMERINTAH PROVINSI</h3>
                <h4 className="text-xl font-bold">KALIMANTAN SELATAN</h4>
              </div>
            </div>
            <p className="mb-4">Portal resmi Pemerintah Provinsi Kalimantan Selatan yang menyediakan informasi dan layanan publik untuk masyarakat.</p>
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Link Cepat</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary">Beranda</Link></li>
              <li><Link href="/profile" className="hover:text-primary">Profil Daerah</Link></li>
              <li><Link href="/government" className="hover:text-primary">Struktur Pemerintahan</Link></li>
              <li><Link href="/news" className="hover:text-primary">Berita Terbaru</Link></li>
              <li><Link href="/services" className="hover:text-primary">Layanan Publik</Link></li>
              <li><Link href="/documents" className="hover:text-primary">Dokumen Publik</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Kontak</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Website Terkait</h3>
            <ul className="space-y-2">
              <li><a href="https://indonesia.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Portal Nasional Indonesia</a></li>
              <li><a href="https://kemendagri.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Kementerian Dalam Negeri</a></li>
              <li><a href="https://banjarmasin.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Kota Banjarmasin</a></li>
              <li><a href="#" className="hover:text-primary">LPSE Kalimantan Selatan</a></li>
              <li><a href="#" className="hover:text-primary">e-Budgeting Kalsel</a></li>
              <li><a href="#" className="hover:text-primary">Disdukcapil Kalsel</a></li>
              <li><a href="#" className="hover:text-primary">Dinas Pendidikan Kalsel</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-10 pt-6 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Pemerintah Provinsi Kalimantan Selatan. Hak Cipta Dilindungi.</p>
            <div className="flex mt-4 md:mt-0">
              <Link href="/privacy" className="mr-4 hover:text-primary">Kebijakan Privasi</Link>
              <Link href="/terms" className="mr-4 hover:text-primary">Syarat Penggunaan</Link>
              <Link href="/sitemap" className="hover:text-primary">Peta Situs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
