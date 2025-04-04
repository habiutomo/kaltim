import { useQuery } from '@tanstack/react-query';
import { OfficialWithParsedSocialMedia, parseOfficial } from '@/lib/types';
import { Official, Department } from '@shared/schema';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GovernmentPage = () => {
  const { data: officials, isLoading: isOfficialsLoading } = useQuery<Official[]>({ 
    queryKey: ['/api/officials'] 
  });
  
  const { data: departments, isLoading: isDepartmentsLoading } = useQuery<Department[]>({ 
    queryKey: ['/api/departments'] 
  });

  const isLoading = isOfficialsLoading || isDepartmentsLoading;

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Hero section */}
      <div className="relative bg-secondary py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&h=400&q=80" 
            alt="Struktur Pemerintahan" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Struktur Pemerintahan</h1>
            <p className="text-white text-lg">
              Pemerintah Provinsi Kalimantan Selatan terdiri dari Gubernur, Wakil Gubernur, dan perangkat daerah 
              yang bekerja untuk melayani masyarakat.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-lg text-neutral-dark">Memuat data struktur pemerintahan...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-secondary mb-8">Pimpinan Daerah</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {officials && officials
                .filter(official => 
                  official.position.includes('Gubernur') || 
                  official.position.includes('Wakil Gubernur')
                )
                .map(official => {
                  const parsedOfficial = parseOfficial(official);
                  return (
                    <Card key={official.id} className="bg-white shadow-md overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                          <div className="mb-4 md:mb-0 md:mr-6">
                            <div className="inline-block rounded-full border-4 border-primary p-1">
                              <img 
                                src={official.image} 
                                alt={official.name} 
                                className="w-32 h-32 rounded-full object-cover" 
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-secondary">{official.name}</h3>
                            <p className="text-neutral-dark mb-4">{official.position}</p>
                            <p className="text-sm text-neutral-dark mb-4">{official.description}</p>
                            <div className="flex justify-center md:justify-start space-x-3">
                              {parsedOfficial.socialMedia.twitter && (
                                <a 
                                  href={parsedOfficial.socialMedia.twitter} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                                >
                                  <Twitter className="h-4 w-4" />
                                </a>
                              )}
                              {parsedOfficial.socialMedia.instagram && (
                                <a 
                                  href={parsedOfficial.socialMedia.instagram} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                                >
                                  <Instagram className="h-4 w-4" />
                                </a>
                              )}
                              {parsedOfficial.socialMedia.facebook && (
                                <a 
                                  href={parsedOfficial.socialMedia.facebook} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                                >
                                  <Facebook className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
            
            <h2 className="text-2xl font-bold text-secondary mb-8">Struktur Organisasi</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-12">
              <div className="w-full overflow-auto">
                <div className="min-w-max">
                  <div className="flex justify-center mb-8">
                    <div className="bg-secondary text-white px-6 py-4 rounded-lg text-center min-w-[200px]">
                      <h3 className="font-bold">Gubernur</h3>
                      <p className="text-sm">{officials?.find(o => o.position.includes('Gubernur') && !o.position.includes('Wakil'))?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <div className="bg-secondary-light text-white px-6 py-4 rounded-lg text-center min-w-[200px]">
                      <h3 className="font-bold">Wakil Gubernur</h3>
                      <p className="text-sm">{officials?.find(o => o.position.includes('Wakil Gubernur'))?.name}</p>
                    </div>
                  </div>
                  
                  <div className="border-l-2 border-neutral-dark h-8 mx-auto"></div>
                  
                  <div className="flex justify-center mb-8">
                    <div className="bg-primary text-white px-6 py-4 rounded-lg text-center min-w-[200px]">
                      <h3 className="font-bold">Sekretariat Daerah</h3>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departments?.map(department => (
                      <div key={department.id} className="bg-neutral rounded p-4 shadow-sm">
                        <h4 className="font-bold mb-2 text-secondary">{department.name}</h4>
                        <p className="text-sm text-neutral-dark">{department.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-secondary mb-8">Pejabat Struktural</h2>
            
            {officials && officials
              .filter(official => 
                !official.position.includes('Gubernur') && 
                !official.position.includes('Wakil Gubernur')
              ).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {officials
                  .filter(official => 
                    !official.position.includes('Gubernur') && 
                    !official.position.includes('Wakil Gubernur')
                  )
                  .map(official => {
                    const parsedOfficial = parseOfficial(official);
                    return (
                      <Card key={official.id} className="bg-white shadow-md overflow-hidden">
                        <CardContent className="p-4 text-center">
                          <div className="inline-block rounded-full border-2 border-primary p-1 mb-3">
                            <img 
                              src={official.image} 
                              alt={official.name} 
                              className="w-24 h-24 rounded-full object-cover" 
                            />
                          </div>
                          <h3 className="text-lg font-bold text-secondary">{official.name}</h3>
                          <p className="text-neutral-dark text-sm mb-2">{official.position}</p>
                          <div className="flex justify-center space-x-2">
                            {parsedOfficial.socialMedia.twitter && (
                              <a 
                                href={parsedOfficial.socialMedia.twitter} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                              >
                                <Twitter className="h-3 w-3" />
                              </a>
                            )}
                            {parsedOfficial.socialMedia.instagram && (
                              <a 
                                href={parsedOfficial.socialMedia.instagram} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                              >
                                <Instagram className="h-3 w-3" />
                              </a>
                            )}
                            {parsedOfficial.socialMedia.facebook && (
                              <a 
                                href={parsedOfficial.socialMedia.facebook} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white hover:bg-secondary-dark transition-colors"
                              >
                                <Facebook className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            ) : (
              <p className="text-neutral-dark">Tidak ada data pejabat struktural yang tersedia saat ini.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GovernmentPage;
