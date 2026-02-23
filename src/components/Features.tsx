import { ShieldCheck, Lock, Headset } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <ShieldCheck className="text-primary" size={36} />,
      title: "Ekspertiz Garantisi",
      description: "Tüm araçlarımız şeffaf ekspertiz raporu ve kalite onayıyla sunulur."
    },
    {
      icon: <Lock className="text-primary" size={36} />,
      title: "Güvenli İşlem",
      description: "Resmi prosedürler ve güvenli ödeme yöntemleriyle profesyonel hizmet."
    },
    {
      icon: <Headset className="text-primary" size={36} />,
      title: "VIP Danışmanlık",
      description: "Satın alma sürecinizin her aşamasında kişiye özel uzman desteği."
    }
  ];

  return (
    <section className="border-y border-slate-200 py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">{feature.icon}</div>
              <div className="space-y-2">
                <h5 className="text-lg font-bold">{feature.title}</h5>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
