import { Search, Menu, Car } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-white">
            <Car size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-primary uppercase">LuxuryAuto</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">İlanlar</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Hakkımızda</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">İletişim</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
            <Search size={20} />
          </button>
          <button className="md:hidden flex h-10 w-10 items-center justify-center">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
