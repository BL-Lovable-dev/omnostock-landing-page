
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Mission />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
