import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    // Could navigate to search results page
    // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-secondary">Pencarian</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0">
              <X className="h-5 w-5" />
            </Button>
          </DialogClose>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="flex flex-col space-y-4">
          <div className="flex items-stretch">
            <Input
              type="search"
              placeholder="Cari informasi..."
              className="flex-grow rounded-r-none border-r-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark text-white rounded-l-none"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Contoh: Perizinan, Pariwisata, COVID-19, PPDB
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
