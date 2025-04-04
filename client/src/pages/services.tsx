import { useQuery } from '@tanstack/react-query';
import { Service } from '@shared/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ServicesPage = () => {
  const { data: services, isLoading } = useQuery<Service[]>({ 
    queryKey: ['/api/services']
  });

  const ServiceIcon = ({ icon }: { icon: string }) => (
    <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mb-4">
      <i className={`fas fa-${icon} text-primary text-2xl`}></i>
    </div>
  );

  const emergencyServices = [
    {
      title: "Pemadam Kebakaran",
      description: "Layanan tanggap darurat untuk kebakaran dan bencana di seluruh Kalimantan Selatan.",
      icon: "fire-extinguisher",
      contacts: ["113", "(0511) 3365234"]
    },
    {
      title: "Ambulans",
      description: "Layanan ambulans untuk keadaan darurat medis.",
      icon: "ambulance",
      contacts: ["118", "(0511) 3258881"]
    },
    {
      title: "Polisi",
      description: "Layanan kepolisian untuk keadaan darurat dan keamanan.",
      icon: "shield-alt",
      contacts: ["110", "(0511) 3310319"]
    },
    {
      title: "Search & Rescue (SAR)",
      description: "Tim pencarian dan penyelamatan untuk bencana dan kecelakaan.",
      icon: "life-ring",
      contacts: ["115", "(0511) 3304760"]
    },
    {
      title: "Badan Penanggulangan Bencana Daerah",
      description: "Koordinasi penanganan bencana di Kalimantan Selatan.",
      icon: "house-damage",
      contacts: ["(0511) 3263941"]
    }
  ];

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Hero section */}
      <div className="relative bg-secondary py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&h=400&q=80" 
            alt="Layanan Publik" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Layanan Publik</h1>
            <p className="text-white text-lg">
              Pemerintah Provinsi Kalimantan Selatan menyediakan berbagai layanan publik untuk memenuhi 
              kebutuhan masyarakat. Temukan informasi tentang layanan yang tersedia di sini.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="regular" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="regular">Layanan Reguler</TabsTrigger>
            <TabsTrigger value="emergency">Layanan Darurat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regular">
            <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Layanan Publik Reguler</h2>
            
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-lg text-neutral-dark">Memuat layanan...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services?.map(service => (
                  <Card key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <ServiceIcon icon={service.icon} />
                      <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                      <p className="text-neutral-dark text-sm mb-4">{service.description}</p>
                      <a
                        href={service.link}
                        className="text-secondary hover:text-secondary-dark font-medium inline-flex items-center text-sm"
                      >
                        Selengkapnya <span className="ml-1">→</span>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="emergency">
            <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Layanan Darurat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyServices.map((service, index) => (
                <Card key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <ServiceIcon icon={service.icon} />
                    <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                    <p className="text-neutral-dark text-sm mb-4">{service.description}</p>
                    <div className="space-y-1 text-sm">
                      <h4 className="font-semibold">Nomor Kontak:</h4>
                      {service.contacts.map((contact, i) => (
                        <p key={i} className="text-secondary font-medium">{contact}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">Cara Mengakses Layanan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-3xl font-bold">1</span>
              </div>
              <h3 className="font-bold mb-2">Identifikasi Layanan</h3>
              <p className="text-sm text-neutral-dark">
                Pilih layanan publik yang sesuai dengan kebutuhan Anda dari daftar di atas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-3xl font-bold">2</span>
              </div>
              <h3 className="font-bold mb-2">Siapkan Dokumen</h3>
              <p className="text-sm text-neutral-dark">
                Persiapkan dokumen-dokumen yang diperlukan sesuai dengan persyaratan layanan.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary bg-opacity-10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary text-3xl font-bold">3</span>
              </div>
              <h3 className="font-bold mb-2">Kunjungi Kantor atau Portal</h3>
              <p className="text-sm text-neutral-dark">
                Datang ke kantor layanan terkait atau akses layanan secara online melalui portal yang disediakan.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary text-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">Perlu Bantuan Lebih Lanjut?</h2>
              <p className="mb-4">
                Jika Anda membutuhkan informasi lebih lanjut atau bantuan dalam mengakses layanan publik, 
                silakan hubungi pusat layanan terpadu kami.
              </p>
              <div className="flex items-center">
                <span className="font-bold mr-2">Call Center:</span>
                <span>(0511) 3304583</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">Email:</span>
                <span>layanan@kalselprov.go.id</span>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://placehold.co/150x150/006B3C/FFFFFF?text=Layanan"
                alt="Pusat Layanan Terpadu"
                className="h-36 w-36 rounded-full border-4 border-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
