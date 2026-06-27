import React, { useState } from 'react';
import { Search, Gift } from 'lucide-react';
import type { Product } from '../types';

interface ShopProps {
  products: Product[];
  setSelectedProduct: (product: Product | null) => void;
}

export const Shop: React.FC<ShopProps> = ({ products, setSelectedProduct }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Shop Search Bar */}
      <div className="bg-cardBg p-4 rounded-custom shadow-sm flex items-center space-x-2">
        <Search className="w-5 h-5 text-icon" />
        <input 
          type="text" 
          placeholder="Gifts / Sovg'alarni qidirish..." 
          className="bg-transparent text-sm w-full outline-none text-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-2 gap-3">
        {products
          .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((product) => (
            <div key={product.id} className="bg-cardBg rounded-custom shadow-sm overflow-hidden flex flex-col">
              <img src={product.image} alt={product.name} className="h-28 w-full object-cover" />
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1 leading-snug">{product.name}</h4>
                  <p className="text-xs text-gray-400 mb-2">Qoldiq: {product.stock} ta</p>
                </div>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-primary text-white py-1.5 rounded-custom text-xs font-semibold flex justify-center items-center space-x-1"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{product.price} Coin</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
