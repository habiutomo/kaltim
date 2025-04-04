import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, FolderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { News } from '@shared/schema';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, 'd MMM yyyy', { locale: id });
};

const NewsSection = () => {
  const { data: featuredNews, isLoading: isFeaturedLoading } = useQuery<News[]>({ 
    queryKey: ['/api/news/featured']
  });
  
  const { data: latestNews, isLoading: isLatestLoading } = useQuery<News[]>({ 
    queryKey: ['/api/news/latest/3']
  });

  const isLoading = isFeaturedLoading || isLatestLoading;

  if (isLoading) {
    return (
      <section id="berita" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-secondary relative">
              Berita & Pengumuman
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary"></span>
            </h2>
          </div>
          <div className="text-center py-8">Memuat berita...</div>
        </div>
      </section>
    );
  }

  const featured = featuredNews?.[0];

  return (
    <section id="berita" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-secondary relative">
            Berita & Pengumuman
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-primary"></span>
          </h2>
          <Link href="/news" className="text-secondary hover:text-secondary-dark font-medium">
            Lihat Semua <span className="ml-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured News */}
          {featured && (
            <div className="md:col-span-2 bg-neutral rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={featured.image} 
                alt={featured.title} 
                className="w-full h-64 object-cover" 
              />
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-neutral-dark">
                  <span className="flex items-center mr-4">
                    <CalendarIcon className="w-4 h-4 mr-1" /> 
                    {formatDate(featured.publishDate)}
                  </span>
                  <span className="flex items-center">
                    <FolderIcon className="w-4 h-4 mr-1" /> 
                    {featured.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 hover:text-secondary">{featured.title}</h3>
                <p className="text-neutral-dark mb-4">{featured.summary}</p>
                <Button 
                  asChild
                  className="bg-secondary hover:bg-secondary-dark text-white font-medium"
                >
                  <Link href={`/news/${featured.id}`}>
                    Baca Selengkapnya
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* News List */}
          <div className="space-y-6">
            {latestNews?.map((news) => (
              <Link key={news.id} href={`/news/${news.id}`}>
                <Card className="bg-neutral rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-20 h-20 object-cover rounded mr-4" 
                      />
                      <div>
                        <span className="text-xs text-neutral-dark mb-1 block">
                          {formatDate(news.publishDate)} • {news.category}
                        </span>
                        <h3 className="font-medium text-md hover:text-secondary">
                          {news.title}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
