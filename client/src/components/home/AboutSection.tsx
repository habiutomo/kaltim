import { MapPinIcon, UsersIcon, BuildingIcon, LandmarkIcon, PlayIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StatItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatItem = ({ icon, title, value }: StatItemProps) => (
  <div className="flex items-center">
    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
      {icon}
    </div>
    <div>
      <h4 className="font-bold">{title}</h4>
      <p>{value}</p>
    </div>
  </div>
);

const AboutSection = () => {
  const stats = [
    {
      icon: <MapPinIcon className="text-white text-xl" />,
      title: "Luas Wilayah",
      value: "37.530,52 km²"
    },
    {
      icon: <UsersIcon className="text-white text-xl" />,
      title: "Jumlah Penduduk",
      value: "±4,1 juta jiwa"
    },
    {
      icon: <BuildingIcon className="text-white text-xl" />,
      title: "Kota/Kabupaten",
      value: "13 wilayah"
    },
    {
      icon: <LandmarkIcon className="text-white text-xl" />,
      title: "Ibu Kota",
      value: "Banjarmasin"
    }
  ];

  return (
    <section id="profil" className="py-12 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              Profil Daerah
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-secondary">
              Kalimantan Selatan
            </h2>
            <p className="text-neutral-dark mb-6">
              Kalimantan Selatan adalah sebuah provinsi di Indonesia yang terletak di pulau Kalimantan. 
              Provinsi ini memiliki luas wilayah 37.530,52 km² dengan jumlah penduduk sekitar 4,1 juta jiwa. 
              Ibu kotanya adalah Kota Banjarmasin.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {stats.map((stat, index) => (
                <StatItem 
                  key={index}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                />
              ))}
            </div>
            
            <Button 
              asChild
              className="bg-secondary hover:bg-secondary-dark text-white font-medium"
            >
              <a href="/profile">Profil Lengkap</a>
            </Button>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1511545922313-5d12d1de0ab5?auto=format&fit=crop&w=800&h=450&q=80" 
                alt="Sungai di Kalimantan Selatan" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-secondary bg-opacity-40 flex items-center justify-center">
                <button className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-colors">
                  <PlayIcon className="text-secondary text-2xl" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              <img 
                src="https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=200&h=100&q=80" 
                alt="Kebudayaan Kalimantan Selatan" 
                className="w-full h-20 object-cover rounded" 
              />
              <img 
                src="https://images.unsplash.com/photo-1555048153-3f9f27a5f6c2?auto=format&fit=crop&w=200&h=100&q=80" 
                alt="Pariwisata Kalimantan Selatan" 
                className="w-full h-20 object-cover rounded" 
              />
              <img 
                src="https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=200&h=100&q=80" 
                alt="Ekonomi Kalimantan Selatan" 
                className="w-full h-20 object-cover rounded" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
