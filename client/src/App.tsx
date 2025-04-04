import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import NewsPage from "@/pages/news";
import NewsDetail from "@/pages/news-detail";
import ProfilePage from "@/pages/profile";
import GovernmentPage from "@/pages/government";
import ServicesPage from "@/pages/services";
import DocumentsPage from "@/pages/documents";
import ContactPage from "@/pages/contact";

function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/news" component={NewsPage} />
          <Route path="/news/:id" component={NewsDetail} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/government" component={GovernmentPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/documents" component={DocumentsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
