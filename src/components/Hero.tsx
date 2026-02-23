import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[600px] h-[80vh] w-full overflow-hidden bg-primary">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Sports Car" 
          className="h-full w-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
      </div>
      
      <div className="container relative mx-auto flex h-full items-center px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-8"
        >
          <div className="space-y-4">
            <span className="inline-block rounded bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Seçkin Koleksiyon
            </span>
            <h2 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-7xl">
              Hayalinizdeki Araca <br /> Hemen Ulaşın
            </h2>
            <p className="max-w-xl text-base sm:text-lg text-slate-300">
              En prestijli markalar ve benzersiz sürüş deneyimleri için doğru adrestesiniz. Konforu ve gücü yeniden keşfedin.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex h-12 sm:h-14 items-center justify-center rounded bg-white px-6 sm:px-8 text-sm sm:text-base font-bold text-primary hover:bg-slate-200 transition-all cursor-pointer">
              İlanları İncele
            </button>
            <button className="inline-flex h-12 sm:h-14 items-center justify-center rounded border border-white/30 bg-white/5 px-6 sm:px-8 text-sm sm:text-base font-bold text-white backdrop-blur-md hover:bg-white/10 transition-all cursor-pointer">
              Bize Ulaşın
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hidden sm:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest">Keşfet</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
