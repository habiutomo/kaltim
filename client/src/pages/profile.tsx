import { MapPin, Users, Building, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ProfilePage = () => {
  const stats = [
    {
      icon: <MapPin className="text-white text-xl" />,
      title: "Luas Wilayah",
      value: "37.530,52 km²"
    },
    {
      icon: <Users className="text-white text-xl" />,
      title: "Jumlah Penduduk",
      value: "±4,1 juta jiwa"
    },
    {
      icon: <Building className="text-white text-xl" />,
      title: "Kota/Kabupaten",
      value: "13 wilayah"
    },
    {
      icon: <Landmark className="text-white text-xl" />,
      title: "Ibu Kota",
      value: "Banjarmasin"
    }
  ];

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Hero section */}
      <div className="relative bg-secondary py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1511545922313-5d12d1de0ab5?auto=format&fit=crop&w=1600&h=400&q=80" 
            alt="Panorama Kalimantan Selatan" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Profil Kalimantan Selatan</h1>
            <p className="text-white text-lg">
              Mengenal lebih dekat tentang provinsi yang kaya akan budaya, sumber daya alam, dan keberagaman.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-secondary mb-4">Tentang Kalimantan Selatan</h2>
              
              <p>
                Kalimantan Selatan adalah sebuah provinsi di Indonesia yang terletak di pulau Kalimantan. 
                Provinsi ini berbatasan dengan Kalimantan Tengah di utara, Selat Makassar di timur, dan 
                Laut Jawa di selatan. Dengan luas wilayah 37.530,52 km², Kalimantan Selatan memiliki populasi 
                sekitar 4,1 juta jiwa.
              </p>
              
              <p>
                Secara geografis, Kalimantan Selatan terdiri dari dataran rendah di bagian barat dan 
                selatan serta pegunungan di bagian utara dan timur. Provinsi ini memiliki banyak sungai 
                besar, termasuk Sungai Barito yang merupakan sungai terpanjang di Kalimantan Selatan.
              </p>
              
              <p>
                Ibu kota Kalimantan Selatan adalah Banjarmasin, yang juga merupakan kota terbesar dan 
                pusat ekonomi di provinsi ini. Banjarmasin dikenal sebagai "Kota Seribu Sungai" karena 
                dibelah oleh banyak sungai dan kanal.
              </p>

              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Sejarah</h3>
              
              <p>
                Sejarah Kalimantan Selatan tidak dapat dilepaskan dari Kesultanan Banjar, kerajaan 
                Melayu-Islam yang berdiri pada abad ke-16. Kesultanan Banjar menjadi salah satu kerajaan 
                penting di Nusantara dan memiliki pengaruh yang kuat di wilayah Kalimantan.
              </p>
              
              <p>
                Pada masa kolonial, wilayah Kalimantan Selatan dikuasai oleh Belanda melalui perang Banjar 
                yang berlangsung dari tahun 1859 hingga 1905. Setelah kemerdekaan Indonesia, Kalimantan 
                Selatan resmi menjadi provinsi pada tanggal 7 Desember 1956.
              </p>

              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Budaya dan Pariwisata</h3>
              
              <p>
                Kalimantan Selatan memiliki kekayaan budaya yang unik, terutama budaya Banjar dan Dayak. 
                Provinsi ini terkenal dengan seni ukir, tari tradisional seperti tari Baksa Kembang dan 
                Radap Rahayu, serta kerajinan anyaman dan tenun Sasirangan.
              </p>
              
              <p>
                Destinasi wisata populer di Kalimantan Selatan antara lain Pasar Terapung (pasar tradisional 
                di atas sungai), Gunung Meratus, Taman Nasional Tanjung Puting, dan Pulau Kembang. Kuliner 
                khas seperti Soto Banjar, Ketupat Kandangan, dan Amparan Tatak juga menjadi daya tarik bagi wisatawan.
              </p>

              <h3 className="text-xl font-bold text-secondary mt-8 mb-4">Ekonomi</h3>
              
              <p>
                Ekonomi Kalimantan Selatan ditopang oleh sektor pertambangan (terutama batubara), 
                pertanian (karet, kelapa sawit, dan padi), perikanan, dan pariwisata. Pelabuhan Banjarmasin 
                menjadi gerbang perdagangan penting yang menghubungkan Kalimantan dengan pulau-pulau lain 
                di Indonesia dan negara-negara tetangga.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-md mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">Statistik Daerah</h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
                        {stat.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{stat.title}</h4>
                        <p>{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">Lambang Daerah</h3>
                <div className="flex justify-center mb-4">
                  <img 
                    src="https://placehold.co/200x200/F0B323/FFFFFF?text=Lambang+Kalsel" 
                    alt="Lambang Provinsi Kalimantan Selatan" 
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-neutral-dark">
                  Lambang Provinsi Kalimantan Selatan memiliki arti mendalam yang melambangkan kekayaan alam, 
                  budaya, dan semangat masyarakat Kalimantan Selatan.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">Kabupaten & Kota</h3>
                <ul className="space-y-1 text-neutral-dark">
                  <li>• Kota Banjarmasin</li>
                  <li>• Kota Banjarbaru</li>
                  <li>• Kabupaten Banjar</li>
                  <li>• Kabupaten Barito Kuala</li>
                  <li>• Kabupaten Tapin</li>
                  <li>• Kabupaten Hulu Sungai Selatan</li>
                  <li>• Kabupaten Hulu Sungai Tengah</li>
                  <li>• Kabupaten Hulu Sungai Utara</li>
                  <li>• Kabupaten Tabalong</li>
                  <li>• Kabupaten Tanah Laut</li>
                  <li>• Kabupaten Tanah Bumbu</li>
                  <li>• Kabupaten Kotabaru</li>
                  <li>• Kabupaten Balangan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
