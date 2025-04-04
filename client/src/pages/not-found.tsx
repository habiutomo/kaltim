import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="pt-6 pb-0">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/10 rounded-full -translate-y-1 translate-x-1"></div>
              <AlertCircle className="h-24 w-24 text-primary relative" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
            
            <p className="text-gray-600 mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan, 
              dihapus, atau URL yang Anda masukkan salah.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center pt-2 pb-6">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
