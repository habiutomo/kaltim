import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NewspaperIcon, CalendarIcon, HelpingHandIcon } from 'lucide-react';
import { Link } from 'wouter';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  bgColor: string;
}

const InfoCard = ({ icon, title, description, linkText, linkHref, bgColor }: InfoCardProps) => {
  return (
    <Card className="bg-neutral rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className={`${bgColor} p-4 text-white text-center`}>
        {icon}
      </CardHeader>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-neutral-dark mb-4">{description}</p>
        <Link 
          href={linkHref} 
          className="text-secondary hover:text-secondary-dark font-medium inline-flex items-center"
        >
          {linkText} <span className="ml-2">→</span>
        </Link>
      </CardContent>
    </Card>
  );
};

const InfoCards = () => {
  const infoCards = [
    {
      icon: <NewspaperIcon className="h-6 w-6" />,
      title: "Pengumuman Terbaru",
      description: "Dapatkan informasi terbaru dari Pemerintah Provinsi Kalimantan Selatan.",
      linkText: "Lihat Pengumuman",
      linkHref: "/news",
      bgColor: "bg-primary"
    },
    {
      icon: <CalendarIcon className="h-6 w-6" />,
      title: "Agenda Kegiatan",
      description: "Jadwal kegiatan resmi pemerintahan dan acara penting di Kalimantan Selatan.",
      linkText: "Lihat Agenda",
      linkHref: "/agenda",
      bgColor: "bg-secondary"
    },
    {
      icon: <HelpingHandIcon className="h-6 w-6" />,
      title: "Layanan Darurat",
      description: "Nomor telepon penting dan layanan darurat di Kalimantan Selatan.",
      linkText: "Lihat Layanan",
      linkHref: "/emergency",
      bgColor: "bg-primary"
    }
  ];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <InfoCard 
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              linkText={card.linkText}
              linkHref={card.linkHref}
              bgColor={card.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoCards;
