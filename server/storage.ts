import { 
  users, type User, type InsertUser, 
  news, type News, type InsertNews,
  officials, type Official, type InsertOfficial,
  departments, type Department, type InsertDepartment,
  services, type Service, type InsertService,
  documents, type Document, type InsertDocument,
  documentCategories, type DocumentCategory, type InsertDocumentCategory,
  contactMessages, type ContactMessage, type InsertContactMessage
} from "@shared/schema";

// Modify the interface with any CRUD methods you might need
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // News
  getAllNews(): Promise<News[]>;
  getFeaturedNews(): Promise<News[]>;
  getLatestNews(limit: number): Promise<News[]>;
  getNewsByCategory(category: string): Promise<News[]>;
  getNewsById(id: number): Promise<News | undefined>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: number, news: Partial<InsertNews>): Promise<News | undefined>;
  deleteNews(id: number): Promise<boolean>;
  
  // Officials
  getAllOfficials(): Promise<Official[]>;
  getLeadershipOfficials(): Promise<Official[]>;
  getOfficialById(id: number): Promise<Official | undefined>;
  createOfficial(official: InsertOfficial): Promise<Official>;
  updateOfficial(id: number, official: Partial<InsertOfficial>): Promise<Official | undefined>;
  deleteOfficial(id: number): Promise<boolean>;
  
  // Departments
  getAllDepartments(): Promise<Department[]>;
  getDepartmentById(id: number): Promise<Department | undefined>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  updateDepartment(id: number, department: Partial<InsertDepartment>): Promise<Department | undefined>;
  deleteDepartment(id: number): Promise<boolean>;
  
  // Services
  getAllServices(): Promise<Service[]>;
  getServiceById(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Documents
  getAllDocuments(): Promise<Document[]>;
  getLatestDocuments(limit: number): Promise<Document[]>;
  getDocumentsByCategory(category: string): Promise<Document[]>;
  getDocumentById(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, document: Partial<InsertDocument>): Promise<Document | undefined>;
  deleteDocument(id: number): Promise<boolean>;
  
  // Document Categories
  getAllDocumentCategories(): Promise<DocumentCategory[]>;
  getDocumentCategoryById(id: number): Promise<DocumentCategory | undefined>;
  createDocumentCategory(category: InsertDocumentCategory): Promise<DocumentCategory>;
  updateDocumentCategory(id: number, category: Partial<InsertDocumentCategory>): Promise<DocumentCategory | undefined>;
  deleteDocumentCategory(id: number): Promise<boolean>;
  
  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessageById(id: number): Promise<ContactMessage | undefined>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private newsItems: Map<number, News>;
  private officialsMap: Map<number, Official>;
  private departmentsMap: Map<number, Department>;
  private servicesMap: Map<number, Service>;
  private documentsMap: Map<number, Document>;
  private documentCategoriesMap: Map<number, DocumentCategory>;
  private contactMessagesMap: Map<number, ContactMessage>;
  
  private currentUserId: number;
  private currentNewsId: number;
  private currentOfficialId: number;
  private currentDepartmentId: number;
  private currentServiceId: number;
  private currentDocumentId: number;
  private currentDocumentCategoryId: number;
  private currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.newsItems = new Map();
    this.officialsMap = new Map();
    this.departmentsMap = new Map();
    this.servicesMap = new Map();
    this.documentsMap = new Map();
    this.documentCategoriesMap = new Map();
    this.contactMessagesMap = new Map();
    
    this.currentUserId = 1;
    this.currentNewsId = 1;
    this.currentOfficialId = 1;
    this.currentDepartmentId = 1;
    this.currentServiceId = 1;
    this.currentDocumentId = 1;
    this.currentDocumentCategoryId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // News
  async getAllNews(): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  
  async getFeaturedNews(): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .filter(news => news.featured)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  
  async getLatestNews(limit: number): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit);
  }
  
  async getNewsByCategory(category: string): Promise<News[]> {
    return Array.from(this.newsItems.values())
      .filter(news => news.category === category)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  
  async getNewsById(id: number): Promise<News | undefined> {
    return this.newsItems.get(id);
  }
  
  async createNews(newsItem: InsertNews): Promise<News> {
    const id = this.currentNewsId++;
    const news: News = { ...newsItem, id };
    this.newsItems.set(id, news);
    return news;
  }
  
  async updateNews(id: number, newsUpdate: Partial<InsertNews>): Promise<News | undefined> {
    const news = this.newsItems.get(id);
    if (!news) return undefined;
    
    const updatedNews = { ...news, ...newsUpdate };
    this.newsItems.set(id, updatedNews);
    return updatedNews;
  }
  
  async deleteNews(id: number): Promise<boolean> {
    return this.newsItems.delete(id);
  }
  
  // Officials
  async getAllOfficials(): Promise<Official[]> {
    return Array.from(this.officialsMap.values());
  }
  
  async getLeadershipOfficials(): Promise<Official[]> {
    return Array.from(this.officialsMap.values())
      .filter(official => 
        official.position.includes('Gubernur') || 
        official.position.includes('Wakil Gubernur')
      );
  }
  
  async getOfficialById(id: number): Promise<Official | undefined> {
    return this.officialsMap.get(id);
  }
  
  async createOfficial(official: InsertOfficial): Promise<Official> {
    const id = this.currentOfficialId++;
    const newOfficial: Official = { ...official, id };
    this.officialsMap.set(id, newOfficial);
    return newOfficial;
  }
  
  async updateOfficial(id: number, officialUpdate: Partial<InsertOfficial>): Promise<Official | undefined> {
    const official = this.officialsMap.get(id);
    if (!official) return undefined;
    
    const updatedOfficial = { ...official, ...officialUpdate };
    this.officialsMap.set(id, updatedOfficial);
    return updatedOfficial;
  }
  
  async deleteOfficial(id: number): Promise<boolean> {
    return this.officialsMap.delete(id);
  }
  
  // Departments
  async getAllDepartments(): Promise<Department[]> {
    return Array.from(this.departmentsMap.values());
  }
  
  async getDepartmentById(id: number): Promise<Department | undefined> {
    return this.departmentsMap.get(id);
  }
  
  async createDepartment(department: InsertDepartment): Promise<Department> {
    const id = this.currentDepartmentId++;
    const newDepartment: Department = { ...department, id };
    this.departmentsMap.set(id, newDepartment);
    return newDepartment;
  }
  
  async updateDepartment(id: number, departmentUpdate: Partial<InsertDepartment>): Promise<Department | undefined> {
    const department = this.departmentsMap.get(id);
    if (!department) return undefined;
    
    const updatedDepartment = { ...department, ...departmentUpdate };
    this.departmentsMap.set(id, updatedDepartment);
    return updatedDepartment;
  }
  
  async deleteDepartment(id: number): Promise<boolean> {
    return this.departmentsMap.delete(id);
  }
  
  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.servicesMap.values());
  }
  
  async getServiceById(id: number): Promise<Service | undefined> {
    return this.servicesMap.get(id);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = { ...service, id };
    this.servicesMap.set(id, newService);
    return newService;
  }
  
  async updateService(id: number, serviceUpdate: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.servicesMap.get(id);
    if (!service) return undefined;
    
    const updatedService = { ...service, ...serviceUpdate };
    this.servicesMap.set(id, updatedService);
    return updatedService;
  }
  
  async deleteService(id: number): Promise<boolean> {
    return this.servicesMap.delete(id);
  }
  
  // Documents
  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documentsMap.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  
  async getLatestDocuments(limit: number): Promise<Document[]> {
    return Array.from(this.documentsMap.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit);
  }
  
  async getDocumentsByCategory(category: string): Promise<Document[]> {
    return Array.from(this.documentsMap.values())
      .filter(doc => doc.category === category)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }
  
  async getDocumentById(id: number): Promise<Document | undefined> {
    return this.documentsMap.get(id);
  }
  
  async createDocument(document: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const newDocument: Document = { ...document, id };
    this.documentsMap.set(id, newDocument);
    return newDocument;
  }
  
  async updateDocument(id: number, documentUpdate: Partial<InsertDocument>): Promise<Document | undefined> {
    const document = this.documentsMap.get(id);
    if (!document) return undefined;
    
    const updatedDocument = { ...document, ...documentUpdate };
    this.documentsMap.set(id, updatedDocument);
    return updatedDocument;
  }
  
  async deleteDocument(id: number): Promise<boolean> {
    return this.documentsMap.delete(id);
  }
  
  // Document Categories
  async getAllDocumentCategories(): Promise<DocumentCategory[]> {
    return Array.from(this.documentCategoriesMap.values());
  }
  
  async getDocumentCategoryById(id: number): Promise<DocumentCategory | undefined> {
    return this.documentCategoriesMap.get(id);
  }
  
  async createDocumentCategory(category: InsertDocumentCategory): Promise<DocumentCategory> {
    const id = this.currentDocumentCategoryId++;
    const newCategory: DocumentCategory = { ...category, id };
    this.documentCategoriesMap.set(id, newCategory);
    return newCategory;
  }
  
  async updateDocumentCategory(id: number, categoryUpdate: Partial<InsertDocumentCategory>): Promise<DocumentCategory | undefined> {
    const category = this.documentCategoriesMap.get(id);
    if (!category) return undefined;
    
    const updatedCategory = { ...category, ...categoryUpdate };
    this.documentCategoriesMap.set(id, updatedCategory);
    return updatedCategory;
  }
  
  async deleteDocumentCategory(id: number): Promise<boolean> {
    return this.documentCategoriesMap.delete(id);
  }
  
  // Contact Messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const submittedAt = new Date();
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      submittedAt, 
      isRead: false 
    };
    this.contactMessagesMap.set(id, newMessage);
    return newMessage;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesMap.values())
      .sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
  }
  
  async getContactMessageById(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessagesMap.get(id);
  }
  
  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contactMessagesMap.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, isRead: true };
    this.contactMessagesMap.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    return this.contactMessagesMap.delete(id);
  }

  // Initialize sample data
  private initializeData() {
    // Sample News
    const newsItems: InsertNews[] = [
      {
        title: "Gubernur Kalimantan Selatan Resmikan Jembatan Baru di Banjarmasin",
        content: "Jembatan baru yang menghubungkan dua kawasan strategis di Banjarmasin telah diresmikan. Proyek ini diharapkan dapat meningkatkan konektivitas dan mendorong pertumbuhan ekonomi wilayah tersebut. Dalam peresmian tersebut, Gubernur Kalimantan Selatan menyampaikan bahwa jembatan ini merupakan bagian dari upaya pemerintah dalam meningkatkan infrastruktur di provinsi Kalimantan Selatan.",
        summary: "Jembatan baru yang menghubungkan dua kawasan strategis di Banjarmasin telah diresmikan. Proyek ini diharapkan dapat meningkatkan konektivitas dan mendorong pertumbuhan ekonomi wilayah tersebut.",
        image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?auto=format&fit=crop&w=800&h=400&q=80",
        category: "Infrastruktur",
        publishDate: new Date("2023-06-15"),
        featured: true
      },
      {
        title: "Pengumuman PPDB Tahun Ajaran 2023/2024 Tingkat SMA/SMK",
        content: "Dinas Pendidikan Provinsi Kalimantan Selatan mengumumkan jadwal Penerimaan Peserta Didik Baru (PPDB) untuk jenjang SMA/SMK se-Kalimantan Selatan. Tahun ajaran 2023/2024 akan dimulai pada bulan Juli mendatang. Orangtua dan calon peserta didik diharapkan memperhatikan jadwal dan persyaratan yang telah ditetapkan.",
        summary: "Dinas Pendidikan mengumumkan jadwal PPDB untuk jenjang SMA/SMK se-Kalimantan Selatan tahun ajaran 2023/2024.",
        image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=120&h=80&q=80",
        category: "Pendidikan",
        publishDate: new Date("2023-06-12"),
        featured: false
      },
      {
        title: "Festival Budaya Kalimantan Selatan 2023 Akan Digelar Bulan Depan",
        content: "Festival Budaya Kalimantan Selatan 2023 akan digelar pada bulan Juli mendatang. Acara ini akan menampilkan berbagai kesenian dan budaya khas Kalimantan Selatan, seperti tari tradisional, musik, kuliner, dan kerajinan tangan. Festival ini merupakan upaya pemerintah dalam melestarikan dan mempromosikan kekayaan budaya Kalimantan Selatan.",
        summary: "Festival Budaya Kalimantan Selatan akan menampilkan berbagai kesenian dan budaya khas daerah.",
        image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?auto=format&fit=crop&w=120&h=80&q=80",
        category: "Budaya",
        publishDate: new Date("2023-06-10"),
        featured: false
      },
      {
        title: "Pemprov Kalsel Salurkan Bantuan Alat Pertanian untuk Petani Lokal",
        content: "Pemerintah Provinsi Kalimantan Selatan menyalurkan bantuan alat pertanian kepada petani lokal di beberapa kabupaten. Bantuan ini bertujuan untuk meningkatkan produktivitas dan kesejahteraan petani di Kalimantan Selatan. Dalam kesempatan tersebut, Kepala Dinas Pertanian menyampaikan bahwa bantuan ini merupakan bagian dari program pemberdayaan petani yang terus dilakukan oleh pemerintah provinsi.",
        summary: "Pemerintah Provinsi Kalimantan Selatan menyalurkan bantuan alat pertanian kepada petani lokal.",
        image: "https://images.unsplash.com/photo-1444664597500-035db93e2323?auto=format&fit=crop&w=120&h=80&q=80",
        category: "Pertanian",
        publishDate: new Date("2023-06-05"),
        featured: false
      }
    ];
    
    newsItems.forEach(news => {
      this.createNews(news);
    });
    
    // Sample Officials
    const officials: InsertOfficial[] = [
      {
        name: "H. Sahbirin Noor, S.Sos., M.H.",
        position: "Gubernur Kalimantan Selatan",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
        description: "Gubernur Kalimantan Selatan periode 2022-2027",
        socialMedia: JSON.stringify({
          twitter: "https://twitter.com/sahbirinnoor",
          instagram: "https://instagram.com/sahbirinnoor",
          facebook: "https://facebook.com/sahbirinnoor"
        })
      },
      {
        name: "H. Muhidin, S.H., M.H.",
        position: "Wakil Gubernur Kalimantan Selatan",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
        description: "Wakil Gubernur Kalimantan Selatan periode 2022-2027",
        socialMedia: JSON.stringify({
          twitter: "https://twitter.com/muhidin",
          instagram: "https://instagram.com/muhidin",
          facebook: "https://facebook.com/muhidin"
        })
      }
    ];
    
    officials.forEach(official => {
      this.createOfficial(official);
    });
    
    // Sample Departments
    const departments: InsertDepartment[] = [
      {
        name: "Sekretariat Daerah",
        description: "Membantu Gubernur dalam penyusunan kebijakan dan koordinasi administratif."
      },
      {
        name: "Dinas Pendidikan",
        description: "Melaksanakan urusan pemerintahan bidang pendidikan yang menjadi kewenangan daerah."
      },
      {
        name: "Dinas Kesehatan",
        description: "Melaksanakan urusan pemerintahan bidang kesehatan yang menjadi kewenangan daerah."
      },
      {
        name: "Dinas Pekerjaan Umum",
        description: "Melaksanakan urusan bidang pekerjaan umum dan penataan ruang."
      },
      {
        name: "Dinas Perhubungan",
        description: "Melaksanakan urusan pemerintahan bidang perhubungan yang menjadi kewenangan daerah."
      },
      {
        name: "Dinas Sosial",
        description: "Melaksanakan urusan pemerintahan bidang sosial yang menjadi kewenangan daerah."
      }
    ];
    
    departments.forEach(department => {
      this.createDepartment(department);
    });
    
    // Sample Services
    const services: InsertService[] = [
      {
        title: "Layanan Kependudukan",
        description: "Pengurusan KTP, KK, Akta Kelahiran, dan dokumen kependudukan lainnya.",
        icon: "id-card",
        link: "#layanan-kependudukan"
      },
      {
        title: "Perizinan Usaha",
        description: "Layanan perizinan untuk membuka dan mengembangkan usaha di Kalimantan Selatan.",
        icon: "briefcase",
        link: "#layanan-perizinan"
      },
      {
        title: "Layanan Kesehatan",
        description: "Informasi fasilitas kesehatan dan program pelayanan kesehatan masyarakat.",
        icon: "heartbeat",
        link: "#layanan-kesehatan"
      },
      {
        title: "Pendidikan",
        description: "Informasi sekolah, beasiswa, dan program pendidikan di Kalimantan Selatan.",
        icon: "graduation-cap",
        link: "#layanan-pendidikan"
      }
    ];
    
    services.forEach(service => {
      this.createService(service);
    });
    
    // Sample Document Categories
    const documentCategories: InsertDocumentCategory[] = [
      {
        name: "Peraturan Daerah",
        description: "Peraturan Daerah (Perda) Provinsi Kalimantan Selatan yang telah disahkan.",
        icon: "file-alt",
        color: "secondary",
        documentsCount: 45
      },
      {
        name: "Laporan Keuangan",
        description: "Laporan keuangan dan anggaran Pemerintah Provinsi Kalimantan Selatan.",
        icon: "chart-line",
        color: "primary",
        documentsCount: 23
      },
      {
        name: "Rencana Pembangunan",
        description: "Dokumen perencanaan pembangunan daerah Kalimantan Selatan.",
        icon: "book",
        color: "secondary",
        documentsCount: 18
      }
    ];
    
    documentCategories.forEach(category => {
      this.createDocumentCategory(category);
    });
    
    // Sample Documents
    const documents: InsertDocument[] = [
      {
        name: "Perda No. 5 Tahun 2023 Tentang Retribusi Daerah",
        category: "Peraturan Daerah",
        publishDate: new Date("2023-06-12"),
        size: "2.5 MB",
        fileUrl: "#download"
      },
      {
        name: "Laporan Realisasi Anggaran Triwulan II 2023",
        category: "Laporan Keuangan",
        publishDate: new Date("2023-06-05"),
        size: "4.2 MB",
        fileUrl: "#download"
      },
      {
        name: "RPJMD Provinsi Kalimantan Selatan 2021-2026",
        category: "Rencana Pembangunan",
        publishDate: new Date("2023-05-20"),
        size: "8.7 MB",
        fileUrl: "#download"
      },
      {
        name: "SK Gubernur Tentang UMK 2023",
        category: "Keputusan Gubernur",
        publishDate: new Date("2023-05-15"),
        size: "1.8 MB",
        fileUrl: "#download"
      }
    ];
    
    documents.forEach(document => {
      this.createDocument(document);
    });
  }
}

export const storage = new MemStorage();
