"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Check, ArrowRight, Disc, Shirt, Sparkles } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
  accent: string;
}

const PRODUCTS: Product[] = [
  {
    id: "merch-1",
    name: "Limited Edition 'Stellar' LP",
    price: "$45",
    description: "180g heavyweight purple marble vinyl inside a silk-screen printed gatefold jacket. Includes digital download code.",
    badge: "Limited Run",
    icon: <Disc className="w-12 h-12 text-purple" />,
    accent: "#8A2BE2"
  },
  {
    id: "merch-2",
    name: "Cyber Cathedral Hoodie",
    price: "$95",
    description: "Heavyweight 450GSM organic French terry cotton, drop shoulder oversized fit. Glow-in-the-dark graphic prints.",
    badge: "Premium Fit",
    icon: <Shirt className="w-12 h-12 text-pink" />,
    accent: "#FF69B4"
  },
  {
    id: "merch-3",
    name: "Holographic Foil Tour Poster",
    price: "$30",
    description: "Individually numbered silkscreen printed poster on heavyweight metallic paper. Limited edition of 500 copies worldwide.",
    badge: "Numbered 1-500",
    icon: <Sparkles className="w-12 h-12 text-gold" />,
    accent: "#D4AF37"
  }
];

export default function Merch() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    setCartOpen(true);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price.replace("$", "")), 0);

  return (
    <section 
      id="merch" 
      className="relative min-h-screen py-24 bg-background overflow-hidden px-6 md:px-16 border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div className="flex flex-col text-left">
            <span className="text-[10px] tracking-[0.35em] font-bold text-gold uppercase mb-2">LUXURY ATTIRE</span>
            <h3 className="text-3xl md:text-5xl font-light font-serif-lux text-foreground italic">
              Prathmesh Singh Boutique
            </h3>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="px-5 py-2.5 rounded-full glass border border-white/10 text-xs font-semibold uppercase tracking-widest text-foreground hover:text-gold hover:border-gold transition-colors flex items-center gap-2 cursor-pointer"
            data-cursor="magnetic"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({cart.length})</span>
          </button>
        </div>

        {/* Product Slider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((prod) => {
            const isAdded = addedProductId === prod.id;
            
            return (
              <div 
                key={prod.id}
                className="flex flex-col items-center select-none"
              >
                {/* 360 rotation hover card container */}
                <div className="w-full aspect-[4/5] max-w-[320px] relative group perspective-1000">
                  <motion.div
                    whileHover={{ 
                      rotateY: 180,
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full h-full rounded-2xl glass p-6 border border-white/10 shadow-2xl relative flex flex-col justify-between"
                  >
                    
                    {/* FRONT SIDE */}
                    <div 
                      className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] font-mono text-white/50 tracking-widest uppercase">
                          {prod.badge}
                        </span>
                        <span className="text-sm font-mono font-bold text-gold tracking-wider">
                          {prod.price}
                        </span>
                      </div>

                      {/* Giant product shape */}
                      <div className="my-auto flex flex-col items-center">
                        <div 
                          className="w-24 h-24 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center relative overflow-hidden mb-4 shadow-inner"
                        >
                          <div 
                            className="absolute inset-0 opacity-10 blur-xl"
                            style={{ backgroundColor: prod.accent }}
                          />
                          {prod.icon}
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider text-center">
                          {prod.name}
                        </h4>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-white/40 tracking-widest uppercase font-semibold">
                        <span>Hover for details</span>
                        <span>360° View</span>
                      </div>
                    </div>

                    {/* BACK SIDE (revealed on Y-axis rotate) */}
                    <div 
                      className="absolute inset-0 p-6 flex flex-col justify-between backface-hidden bg-black/80 rounded-2xl"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <div className="text-left space-y-2">
                        <span className="text-[8px] font-mono text-gold tracking-widest uppercase">
                          PRODUCT MANIFEST
                        </span>
                        <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                          {prod.name}
                        </h5>
                        <p className="text-[11px] leading-relaxed text-white/70 font-light">
                          {prod.description}
                        </p>
                      </div>

                      {/* Buy action inside card */}
                      <button
                        onClick={() => handleAddToCart(prod)}
                        className={`w-full py-2.5 rounded-xl text-center text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isAdded 
                            ? "bg-emerald-500 text-white" 
                            : "bg-white text-black hover:bg-gold hover:text-black"
                        }`}
                        data-cursor="magnetic"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>ADD TO BAG</span>
                          </>
                        )}
                      </button>
                    </div>

                  </motion.div>
                </div>

                {/* Name Label */}
                <span className="text-sm font-bold text-foreground/80 mt-4 uppercase tracking-wider">
                  {prod.name}
                </span>
                <span className="text-xs text-gold/80 font-mono tracking-widest mt-1">
                  {prod.price}
                </span>
              </div>
            );
          })}
        </div>

      </div>

      {/* SHOPPING BAG DRAWER PANEL */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex justify-end"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md h-full glass-premium border-l border-white/10 p-6 flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                  <span className="text-sm font-bold tracking-widest text-white uppercase">YOUR SHOPPING BAG</span>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1 rounded-full hover:bg-white/5 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center text-white/40 py-12 flex flex-col items-center gap-2">
                    <ShoppingBag className="w-8 h-8 opacity-25" />
                    <span className="text-xs tracking-wider uppercase font-semibold">Your bag is empty</span>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex justify-between items-center bg-white/5 rounded-xl p-3 border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="text-xs font-bold text-white truncate max-w-[150px] uppercase">
                            {item.name}
                          </span>
                          <span className="text-[9px] text-white/40 tracking-wider">Qty: 1</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-gold">{item.price}</span>
                        <button 
                          onClick={() => handleRemoveFromCart(idx)}
                          className="text-white/40 hover:text-pink transition-colors p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom calculations */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-4 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/50 uppercase">Bag Total:</span>
                    <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/50 uppercase">Shipping:</span>
                    <span className="text-gold font-bold">FREE SHIPPING</span>
                  </div>
                  <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase">ESTIMATED TOTAL:</span>
                    <span className="text-base font-bold font-mono text-gold">${totalPrice.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => alert("Redirecting to secure luxury checkout...")}
                    className="w-full py-3.5 rounded-xl bg-gold hover:bg-white text-black hover:text-black font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    data-cursor="magnetic"
                  >
                    <span>SECURE CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
