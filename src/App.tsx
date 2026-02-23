import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarCard from './components/CarCard';
import Features from './components/Features';
import Footer from './components/Footer';
import { ArrowRight } from 'lucide-react';

interface CarData {
  image: string;
  brand: string;
  year: number;
  fuel: string;
  model: string;
  price: string;
  badge?: string;
  badgeColor?: string;
}

const featuredCars: CarData[] = [
  {
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    brand: "Porsche",
    year: 2023,
    fuel: "Elektrik",
    model: "Porsche Taycan 4S",
    price: "8.500.000 TL",
    badge: "0 KM"
  },
  {
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    brand: "Mercedes-Benz",
    year: 2022,
    fuel: "Dizel",
    model: "S-Class 400d Long",
    price: "7.200.000 TL"
  },
  {
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    brand: "BMW",
    year: 2023,
    fuel: "Elektrik",
    model: "BMW i7 xDrive60",
    price: "7.800.000 TL",
    badge: "Yeni İlan",
    badgeColor: "green"
  },
  {
    image: "https://images.unsplash.com/photo-1603584173870-7f3ca970466c?auto=format&fit=crop&q=80&w=800",
    brand: "Audi",
    year: 2021,
    fuel: "Elektrik",
    model: "Audi RS e-tron GT",
    price: "6.900.000 TL"
  }
];

export default function App() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <section className="py-24 bg-[#f6f7f8]">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">Öne Çıkan İlanlar</h3>
                <p className="text-slate-600">Haftanın en çok ilgi gören premium modelleri.</p>
              </div>
              <a href="#" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                Tümünü Gör
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredCars.map((car, index) => (
                <CarCard key={index} {...car} />
              ))}
            </div>
          </div>
        </section>
        
        <Features />
      </main>
      
      <Footer />
    </div>
  );
}
