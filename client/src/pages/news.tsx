import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { News } from '@shared/schema';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar, Folder } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NewsPage = () => {
  const { data: news, isLoading } = useQuery<News[]>({ 
    queryKey: ['/api/news']
  });

  const formatDate = (date: Date | string) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return format(parsedDate, 'd MMMM yyyy', { locale: id });
  };

  return (
    <div className="bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Berita & Pengumuman</h1>
          <p className="text-neutral-dark mb-8">
            Informasi terbaru tentang kegiatan dan pengumuman dari Pemerintah Provinsi Kalimantan Selatan.
          </p>
          
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-lg text-neutral-dark">Memuat berita...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news?.map(item => (
                <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3 text-sm text-neutral-dark">
                      <span className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" /> 
                        {formatDate(item.publishDate)}
                      </span>
                      <span className="flex items-center">
                        <Folder className="w-4 h-4 mr-1" /> 
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 hover:text-secondary line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-neutral-dark mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                    <Button 
                      asChild
                      variant="secondary"
                    >
                      <Link href={`/news/${item.id}`}>
                        Baca Selengkapnya
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
