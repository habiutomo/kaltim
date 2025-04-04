import { useQuery } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { Service } from '@shared/schema';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
          <i className={`fas fa-${service.icon} text-primary text-2xl`}></i>
        </div>
        <h3 className="font-bold text-lg mb-2">{service.title}</h3>
        <p className="text-neutral-dark text-sm mb-4">{service.description}</p>
        <Link 
          href={service.link} 
          className="text-secondary hover:text-secondary-dark font-medium inline-flex items-center text-sm"
        >
          Selengkapnya <span className="ml-1">→</span>
        </Link>
      </CardContent>
    </Card>
  );
};

const PublicServices = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const { data: services, isLoading } = useQuery<Service[]>({ 
    queryKey: ['/api/services'] 
  });

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <section id="layanan" className="py-12 bg-neutral">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">Layanan Publik</h2>
            <p className="mt-4">Memuat layanan...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="layanan" className="py-12 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
              Untuk Masyarakat
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-secondary">Layanan Publik</h2>
          </div>
          <div className="hidden md:flex">
            <Button 
              variant="outline" 
              size="icon"
              className="w-10 h-10 rounded-full bg-white border border-neutral-dark mr-2 hover:bg-neutral-dark hover:text-white"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="w-10 h-10 rounded-full bg-white border border-neutral-dark hover:bg-neutral-dark hover:text-white"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:overflow-x-auto md:flex md:flex-nowrap md:scroll-smooth"
        >
          {services?.map((service) => (
            <div key={service.id} className="md:min-w-[300px] md:max-w-[300px]">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-secondary hover:bg-secondary-dark text-white font-medium"
          >
            <Link href="/services">Lihat Semua Layanan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicServices;
