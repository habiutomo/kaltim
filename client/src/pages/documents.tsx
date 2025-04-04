import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Document, DocumentCategory } from '@shared/schema';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DownloadIcon, 
  SearchIcon, 
  FileTextIcon,
  ChartLineIcon,
  BookIcon,
  FileIcon
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<DocumentCategory[]>({ 
    queryKey: ['/api/document-categories'] 
  });
  
  const { data: documents, isLoading: isDocumentsLoading } = useQuery<Document[]>({ 
    queryKey: ['/api/documents'] 
  });

  const isLoading = isCategoriesLoading || isDocumentsLoading;

  const formatDate = (date: Date | string) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    return format(parsedDate, 'd MMMM yyyy', { locale: id });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled reactively through the filtered documents
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'file-alt':
        return <FileTextIcon className="text-white text-xl" />;
      case 'chart-line':
        return <ChartLineIcon className="text-white text-xl" />;
      case 'book':
        return <BookIcon className="text-white text-xl" />;
      default:
        return <FileIcon className="text-white text-xl" />;
    }
  };

  // Filter documents based on search term and selected category
  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Hero section */}
      <div className="relative bg-secondary py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=1600&h=400&q=80" 
            alt="Dokumen Publik" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Dokumen Publik</h1>
            <p className="text-white text-lg">
              Akses dokumen resmi Pemerintah Provinsi Kalimantan Selatan yang terbuka untuk publik.
            </p>
          </div>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex items-stretch">
              <Input
                type="search"
                placeholder="Cari dokumen..."
                className="flex-grow rounded-r-none border-r-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-white rounded-l-none"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-lg text-neutral-dark">Memuat dokumen...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-secondary mb-4">Kategori Dokumen</h2>
                
                <div className="space-y-2">
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedCategory === null ? 'bg-secondary text-white' : 'hover:bg-neutral text-neutral-dark'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    Semua Dokumen
                  </button>
                  
                  {categories?.map(category => (
                    <button
                      key={category.id}
                      className={`w-full text-left px-3 py-2 rounded-md ${
                        selectedCategory === category.name ? 'bg-secondary text-white' : 'hover:bg-neutral text-neutral-dark'
                      }`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="bg-neutral-light px-2 py-0.5 rounded-full text-xs">
                          {category.documentsCount}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h2 className="text-xl font-bold text-secondary mb-4">Tentang Dokumen Publik</h2>
                <p className="text-sm text-neutral-dark mb-4">
                  Dokumen publik ini disediakan sebagai bagian dari komitmen Pemerintah Provinsi Kalimantan Selatan 
                  terhadap transparansi dan keterbukaan informasi publik.
                </p>
                <p className="text-sm text-neutral-dark">
                  Sesuai dengan UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik, masyarakat berhak untuk 
                  mengakses informasi publik yang dihasilkan, disimpan, dan dikelola oleh badan publik.
                </p>
              </div>
            </div>
            
            {/* Documents List */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-secondary mb-6">
                {selectedCategory ? `Dokumen ${selectedCategory}` : 'Semua Dokumen'}
                {searchTerm && ` - Pencarian: "${searchTerm}"`}
              </h2>
              
              {filteredDocuments && filteredDocuments.length > 0 ? (
                <Card className="bg-white rounded-lg shadow-md overflow-hidden">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Dokumen</TableHead>
                          <TableHead>Kategori</TableHead>
                          <TableHead>Tanggal Terbit</TableHead>
                          <TableHead>Ukuran</TableHead>
                          <TableHead>Aksi</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map(doc => (
                          <TableRow key={doc.id} className="hover:bg-neutral-light">
                            <TableCell className="font-medium">{doc.name}</TableCell>
                            <TableCell>{doc.category}</TableCell>
                            <TableCell>{formatDate(doc.publishDate)}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell>
                              <a 
                                href={doc.fileUrl} 
                                className="text-secondary hover:text-secondary-dark flex items-center"
                              >
                                <DownloadIcon className="w-4 h-4 mr-1" /> Unduh
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <FileIcon className="w-16 h-16 text-neutral-dark mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-secondary mb-2">Tidak Ada Dokumen</h3>
                  <p className="text-neutral-dark">
                    {searchTerm 
                      ? `Tidak ada dokumen yang sesuai dengan pencarian "${searchTerm}"`
                      : 'Tidak ada dokumen yang tersedia untuk kategori ini'}
                  </p>
                </div>
              )}
              
              {/* Categories Cards */}
              {!selectedCategory && !searchTerm && categories && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-secondary mb-6">Kategori Dokumen</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(category => (
                      <Card 
                        key={category.id} 
                        className="bg-neutral rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 rounded-lg bg-${category.color} flex items-center justify-center mr-4`}>
                              {getIconComponent(category.icon)}
                            </div>
                            <h3 className="font-bold text-lg">{category.name}</h3>
                          </div>
                          <p className="text-neutral-dark mb-4 text-sm">{category.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs bg-${category.color} bg-opacity-10 text-${category.color} px-3 py-1 rounded-full`}>
                              {category.documentsCount} Dokumen
                            </span>
                            <span className="text-secondary hover:text-secondary-dark text-sm font-medium">
                              Lihat Semua
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
