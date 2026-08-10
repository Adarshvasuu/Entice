import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogsPage } from './pages/BlogsPage';
import { ContactPage } from './pages/ContactPage';
import { LeadModal } from './components/LeadModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PageType } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'blogs':
        return <BlogsPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onOpenConsultation={() => setIsConsultationOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
      
      <WhatsAppWidget />

      {isConsultationOpen && (
        <LeadModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      )}
    </div>
  );
}

export default App;