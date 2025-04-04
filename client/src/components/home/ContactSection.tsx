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

const ContactSection = () => {
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
    <section id="kontak" className="py-12 bg-neutral">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-4">Hubungi Kami</h2>
            <p className="text-neutral-dark mb-6">
              Silakan hubungi kami untuk pertanyaan, saran, atau pengaduan terkait layanan 
              Pemerintah Provinsi Kalimantan Selatan.
            </p>
            
            <div className="space-y-4 mb-8">
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
            
            <div className="mb-6">
              <h3 className="font-bold mb-3">Media Sosial</h3>
              <div className="flex space-x-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#c32aa3] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="bg-white rounded-lg shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">Formulir Kontak</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
        
        <div className="mt-12">
          <Card className="bg-white rounded-lg shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video w-full h-80">
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
      </div>
    </section>
  );
};

export default ContactSection;
