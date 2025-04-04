import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contactMessageFormSchema } from '@shared/schema';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

type ContactFormValues = z.infer<typeof contactMessageFormSchema>;

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactInfoItem = ({ icon, title, children }: ContactInfoItemProps) => (
  <div className="flex items-start">
    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mr-4 mt-1 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-neutral-dark">{children}</p>
    </div>
  </div>
);

const ContactPage = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactMessageFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    }
  });

  const mutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const res = await apiRequest('POST', '/api/contact', values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Pesan Anda telah terkirim.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      console.error('Contact form error:', error);
      toast({
        title: "Terjadi Kesalahan",
        description: "Mohon maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  });

  function onSubmit(values: ContactFormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="bg-neutral-light min-h-screen">
      {/* Hero section */}
      <div className="relative bg-secondary py-16">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1600&h=400&q=80" 
            alt="Hubungi Kami" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Hubungi Kami</h1>
            <p className="text-white text-lg">
              Silakan hubungi kami untuk pertanyaan, saran, atau pengaduan terkait layanan 
              Pemerintah Provinsi Kalimantan Selatan.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-2xl font-bold text-secondary mb-6">Informasi Kontak</h2>
            
            <div className="space-y-6 mb-8">
              <ContactInfoItem icon={<MapPin className="text-white" />} title="Alamat Kantor">
                Jalan Jenderal Sudirman No. 14, Banjarmasin, Kalimantan Selatan 70114, Indonesia
              </ContactInfoItem>
              
              <ContactInfoItem icon={<Phone className="text-white" />} title="Telepon">
                (0511) 3304583
              </ContactInfoItem>
              
              <ContactInfoItem icon={<Mail className="text-white" />} title="Email">
                info@kalselprov.go.id
              </ContactInfoItem>
              
              <ContactInfoItem icon={<Clock className="text-white" />} title="Jam Layanan">
                Senin - Jumat: 08.00 - 16.00 WITA<br />
                Sabtu, Minggu & Hari Libur: Tutup
              </ContactInfoItem>
            </div>
            
            <h2 className="text-2xl font-bold text-secondary mb-4">Media Sosial</h2>
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-[#c32aa3] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            
            <h2 className="text-2xl font-bold text-secondary mb-4">Lokasi Kantor</h2>
            <Card className="bg-white rounded-lg shadow-md overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127669.41105064434!2d114.52484413415292!3d-3.3134448381644748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de4209aa1eec961%3A0x26030bfcc09204d2!2sBanjarmasin%2C%20Banjarmasin%20City%2C%20South%20Kalimantan!5e0!3m2!1sen!2sid!4v1654152189555!5m2!1sen!2sid" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi Pemerintahan Provinsi Kalimantan Selatan"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="bg-white rounded-lg shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-secondary mb-6">Kirim Pesan</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                              <Input placeholder="Nama Lengkap" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nomor Telepon</FormLabel>
                          <FormControl>
                            <Input placeholder="Nomor Telepon" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subjek</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih Subjek" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="information">Permintaan Informasi</SelectItem>
                              <SelectItem value="service">Layanan Publik</SelectItem>
                              <SelectItem value="complaint">Pengaduan</SelectItem>
                              <SelectItem value="suggestion">Saran</SelectItem>
                              <SelectItem value="other">Lainnya</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tulis pesan Anda di sini" 
                              className="resize-none" 
                              rows={5}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Saya menyetujui bahwa data yang saya berikan akan disimpan dan diproses sesuai kebijakan privasi.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-secondary hover:bg-secondary-dark text-white"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <Card className="bg-white rounded-lg shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-4">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-1">Berapa lama waktu respon untuk pesan yang dikirim?</h4>
                      <p className="text-sm text-neutral-dark">
                        Kami berusaha merespon semua pesan dalam 2-3 hari kerja.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-1">Bagaimana cara mengajukan pengaduan?</h4>
                      <p className="text-sm text-neutral-dark">
                        Pengaduan dapat disampaikan melalui formulir kontak dengan memilih subjek "Pengaduan", 
                        atau dapat langsung datang ke kantor kami.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-1">Apakah ada layanan konsultasi langsung?</h4>
                      <p className="text-sm text-neutral-dark">
                        Ya, layanan konsultasi langsung tersedia pada jam kerja di kantor kami. 
                        Disarankan untuk membuat janji terlebih dahulu.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
