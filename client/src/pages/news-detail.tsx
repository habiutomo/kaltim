import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { News } from "@shared/schema";
import { Calendar, Folder, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  
  const { data: news, isLoading, error } = useQuery<News>({ 
    queryKey: [`/api/news/${id}`]
  });

  const formatDate = (date: Date | string) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return format(parsedDate, 'd MMMM yyyy', { locale: id });
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-light min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <p className="text-lg text-neutral-dark">Memuat berita...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="bg-neutral-light min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-secondary mb-4">Berita tidak ditemukan</h2>
            <p className="text-neutral-dark mb-6">Berita yang Anda cari tidak tersedia atau telah dihapus.</p>
            <Button 
              onClick={() => setLocation('/news')}
              className="bg-secondary hover:bg-secondary-dark text-white"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Berita
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => setLocation('/news')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Kembali ke Berita
        </Button>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-[400px] object-cover object-center" 
          />
          
          <div className="p-8">
            <div className="flex items-center mb-4 text-sm text-neutral-dark">
              <span className="flex items-center mr-4">
                <Calendar className="w-4 h-4 mr-1" /> 
                {formatDate(news.publishDate)}
              </span>
              <span className="flex items-center">
                <Folder className="w-4 h-4 mr-1" /> 
                {news.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-6 text-secondary">{news.title}</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg font-medium mb-6">{news.summary}</p>
              <div>
                {news.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
