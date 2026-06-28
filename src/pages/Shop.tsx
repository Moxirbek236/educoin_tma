import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, TextField, InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Gift, ShoppingBag, X } from 'lucide-react';
import type { Product, Transaction } from '../types';

interface ShopProps {
  products: Product[];
  setSelectedProduct?: (product: Product | null) => void;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export const Shop: React.FC<ShopProps> = ({ products, balance, setBalance, transactions, setTransactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuyProduct = async (product: Product) => {
    if (balance < product.price) {
      alert('Koinlar yetarli emas!');
      return;
    }
    
    setIsBuying(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      let activeChatId = searchParams.get('chatId');
      if (!activeChatId) {
        const tg = (window as any).Telegram?.WebApp;
        if (tg) activeChatId = tg.initDataUnsafe?.user?.id;
      }

      const baseUrl = process.env.NODE_ENV === 'production' ? 'https://educoin-b2b.educoinapp.uz' : 'https://educoin-b2b-dev.educoinapp.uz';
      const res = await fetch(`${baseUrl}/api/v1/bot/tma/buy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: activeChatId, productId: Number(product.id) })
      });
      const data = await res.json();
      
      if (data.success) {
        setBalance(prev => prev - product.price);
        const newTx: Transaction = {
          id: 'tx_' + Date.now(),
          type: 'SPENT',
          amount: product.price,
          description: `Do'kondan ${product.name} sotib olindi`,
          date: new Date().toISOString().split('T')[0],
          category: 'Xarid'
        };
        setTransactions([newTx, ...transactions]);
        setSelectedProduct(null);
        alert('Muvaffaqiyatli sotib olindi! Filial adminstratoridan qabul qilishingiz mumkin.');
      } else {
        alert(data.message || 'Xatolik yuz berdi');
      }
    } catch (e) {
      alert('Server bilan ulanishda xatolik');
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Search Bar */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Gifts / Sovg'alarni qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color="#596371" />
                </InputAdornment>
              ),
              sx: { bgcolor: 'background.paper', borderRadius: '0.65rem' }
            }
          }}
          size="small"
        />
      </motion.div>

      {/* Product Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {products
          .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 1.5, display: 'flex', flexDirection: 'column', gap: 1, '&:last-child': { pb: 1.5 } }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 0.5 }}>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Qoldiq: {product.stock} ta
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="small"
                    startIcon={<Gift size={16} />}
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.price} Coin
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </Box>

      {/* Buy Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <Dialog 
            open={!!selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            slotProps={{ paper: { sx: { borderRadius: '1rem', width: '100%', m: 2 } } }}
          >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', pb: 1 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{selectedProduct.name}</Typography>
                <Typography variant="caption" color="text.secondary">Narxi: {selectedProduct.price} Coin</Typography>
              </Box>
              <IconButton onClick={() => setSelectedProduct(null)} size="small" sx={{ mr: -1, mt: -1 }}>
                <X size={20} />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 2 }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: '0.65rem', marginBottom: 16 }} />
              <Box sx={{ bgcolor: '#F4EBFF', p: 1.5, borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Sizdagi coinlar:</Typography>
                <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 'bold' }}>{balance} Coin</Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
              <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={() => handleBuyProduct(selectedProduct)}
              disabled={balance < selectedProduct.price || isBuying}
            >
              {isBuying ? 'Xarid qilinmoqda...' : `${selectedProduct.price} Coin evaziga olish`}
            </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </Box>
  );
};
