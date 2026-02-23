import { Car, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-400 pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-primary">
                <Car size={20} />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-white uppercase">LuxuryAuto</h2>
            </div>
            <p className="text-sm leading-relaxed">
              LuxuryAuto, lüks otomobil segmentinde Türkiye'nin öncü kuruluşlarından biridir. Prestijli araçları en yüksek hizmet kalitesiyle buluşturuyoruz.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6 lg:ml-auto">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Hızlı Menü</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Araç İlanları</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Satış Politikamız</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">Yasal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Gizlilik Sözleşmesi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Çerez Politikası</a></li>
              <li><a href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">İletişim</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="pt-1" />
                <span>Etiler Mah. Nispetiye Cad. No:12 <br /> Beşiktaş, İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span>+90 (212) 555 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@luxuryauto.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 LUXURYAUTO. TÜM HAKLARI SAKLIDIR.</p>
          <div className="flex items-center gap-2">
            <span>İstanbul</span>
            <div className="h-1 w-1 rounded-full bg-slate-600"></div>
            <span>Londra</span>
            <div className="h-1 w-1 rounded-full bg-slate-600"></div>
            <span>Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
