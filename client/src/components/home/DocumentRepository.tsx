import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { DocumentCategory, Document } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, DownloadIcon } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const formatDate = (date: Date | string) => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return format(parsedDate, 'd MMMM yyyy', { locale: id });
};

interface DocumentCategoryCardProps {
  category: DocumentCategory;
}

const DocumentCategoryCard = ({ category }: DocumentCategoryCardProps) => {
  return (
    <Card className="bg-neutral rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg bg-${category.color} flex items-center justify-center mr-4`}>
            <i className={`fas fa-${category.icon} text-white text-xl`}></i>
          </div>
          <h3 className="font-bold text-lg">{category.name}</h3>
        </div>
        <p className="text-neutral-dark mb-4 text-sm">{category.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs bg-${category.color} bg-opacity-10 text-${category.color} px-3 py-1 rounded-full`}>
            {category.documentsCount} Dokumen
          </span>
          <Link 
            href={`/documents/category/${category.id}`}
            className="text-secondary hover:text-secondary-dark text-sm font-medium"
          >
            Lihat Semua
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentRepository = () => {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<DocumentCategory[]>({ 
    queryKey: ['/api/document-categories'] 
  });
  
  const { data: documents, isLoading: isDocumentsLoading } = useQuery<Document[]>({ 
    queryKey: ['/api/documents/latest/4'] 
  });

  const isLoading = isCategoriesLoading || isDocumentsLoading;

  if (isLoading) {
    return (
      <section id="dokumen" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Dokumen Publik</h2>
          </div>
          <div className="text-center py-8">Memuat dokumen...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="dokumen" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Dokumen Publik</h2>
          <p className="text-neutral-dark">
            Akses dokumen resmi Pemerintah Provinsi Kalimantan Selatan yang terbuka untuk publik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Document Categories */}
          {categories?.map((category) => (
            <DocumentCategoryCard key={category.id} category={category} />
          ))}
        </div>
        
        {/* Recent Documents */}
        <Card className="bg-neutral rounded-lg shadow-md">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">Dokumen Terbaru</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium">Nama Dokumen</th>
                    <th className="text-left py-3 font-medium">Kategori</th>
                    <th className="text-left py-3 font-medium">Tanggal Terbit</th>
                    <th className="text-left py-3 font-medium">Ukuran</th>
                    <th className="text-left py-3 font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {documents?.map((doc) => (
                    <tr key={doc.id} className="border-b hover:bg-neutral-dark hover:bg-opacity-5">
                      <td className="py-3">{doc.name}</td>
                      <td className="py-3">{doc.category}</td>
                      <td className="py-3">{formatDate(doc.publishDate)}</td>
                      <td className="py-3">{doc.size}</td>
                      <td className="py-3">
                        <a 
                          href={doc.fileUrl} 
                          className="text-secondary hover:text-secondary-dark flex items-center"
                        >
                          <DownloadIcon className="w-4 h-4 mr-1" /> Unduh
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="text-center mt-6">
              <Button 
                asChild
                className="bg-secondary hover:bg-secondary-dark text-white rounded-md text-sm"
              >
                <Link href="/documents">Lihat Semua Dokumen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DocumentRepository;
