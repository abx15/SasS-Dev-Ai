import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-dark min-h-screen selection:bg-brand-primary/30 selection:text-brand-primary">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
