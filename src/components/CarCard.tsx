import React from 'react';
import { Heart } from 'lucide-react';

export interface CarCardProps {
  image: string;
  brand: string;
  year: number;
  fuel: string;
  model: string;
  price: string;
  badge?: string;
  badgeColor?: string;
}

const CarCard: React.FC<CarCardProps> = ({ image, brand, year, fuel, model, price, badge, badgeColor }) => {
  return (
    <div className="group overflow-hidden rounded-lg bg-white border border-slate-200 transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={model} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {badge && (
          <div className={`absolute top-4 ${badgeColor === 'green' ? 'left-4 bg-emerald-600' : 'right-4 bg-primary/80'} rounded px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm uppercase`}>
            {badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase text-slate-500">{year} {brand}</span>
          <span className="text-xs font-medium text-slate-400">{fuel}</span>
        </div>
        <h4 className="mb-4 text-lg font-bold">{model}</h4>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xl font-black text-primary">{price}</span>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
