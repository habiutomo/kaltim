import { HeadsetIcon, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section id="beranda" className="relative bg-secondary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=1600&h=600&q=80" 
          alt="Pemandangan Kalimantan Selatan" 
          className="w-full h-full object-cover opacity-40" 
        />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            Selamat Datang di Website Resmi
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Pemerintah Provinsi Kalimantan Selatan
          </h1>
          <p className="text-white text-lg mb-8">
            Portal resmi yang menyediakan informasi dan layanan publik untuk masyarakat Kalimantan Selatan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild
              className="bg-primary hover:bg-primary-dark text-white font-medium"
            >
              <a href="#layanan">
                <HeadsetIcon className="mr-2 h-4 w-4" /> Layanan Publik
              </a>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-transparent backdrop-blur-sm"
            >
              <a href="#profil">
                <InfoIcon className="mr-2 h-4 w-4" /> Tentang Kalsel
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
