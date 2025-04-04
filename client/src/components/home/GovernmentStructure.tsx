import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Official, Department } from '@shared/schema';
import { OfficialWithParsedSocialMedia, parseOfficial } from '@/lib/types';

const GovernmentStructure = () => {
  const { data: officials, isLoading: isOfficialsLoading } = useQuery<Official[]>({ 
    queryKey: ['/api/officials/leadership'] 
  });
  
  const { data: departments, isLoading: isDepartmentsLoading } = useQuery<Department[]>({ 
    queryKey: ['/api/departments'] 
  });

  const isLoading = isOfficialsLoading || isDepartmentsLoading;
  
  if (isLoading) {
    return (
      <section id="pemerintahan" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Struktur Pemerintahan</h2>
            <p className="text-muted-foreground">Memuat data...</p>
          </div>
        </div>
      </section>
    );
  }

  const parsedOfficials = officials?.map(parseOfficial) || [];

  return (
    <section id="pemerintahan" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Struktur Pemerintahan</h2>
          <p className="text-neutral-dark max-w-3xl mx-auto">
            Pemerintah Provinsi Kalimantan Selatan dipimpin oleh Gubernur dan Wakil Gubernur yang 
            dibantu oleh perangkat daerah dalam menjalankan roda pemerintahan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Leadership */}
          {parsedOfficials.map((official) => (
            <Card key={official.id} className="bg-neutral rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-block rounded-full border-4 border-primary p-1 mb-4">
                  <img 
                    src={official.image} 
                    alt={official.name} 
                    className="w-32 h-32 rounded-full object-cover" 
                  />
                </div>
                <h3 className="text-xl font-bold text-secondary">{official.name}</h3>
                <p className="text-neutral-dark mb-4">{official.position}</p>
                <div className="flex justify-center space-x-3">
                  {official.socialMedia.twitter && (
                    <a 
                      href={official.socialMedia.twitter} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {official.socialMedia.instagram && (
                    <a 
                      href={official.socialMedia.instagram} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {official.socialMedia.facebook && (
                    <a 
                      href={official.socialMedia.facebook} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Government Structure */}
        <Card className="bg-neutral rounded-lg shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-secondary mb-6">Perangkat Daerah</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments?.map((department) => (
                <div key={department.id} className="bg-white rounded p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold mb-2 text-secondary">{department.name}</h4>
                  <p className="text-sm text-neutral-dark">{department.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Button 
                asChild
                variant="outline" 
                className="border-secondary text-secondary hover:bg-secondary hover:text-white"
              >
                <a href="/government">Lihat Struktur Lengkap</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GovernmentStructure;
