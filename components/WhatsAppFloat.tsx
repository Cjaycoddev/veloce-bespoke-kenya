'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/254700000000?text=Hi%20Veloce%20Bespoke%2C%20I%27m%20interested%20in%20a%20vehicle."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-[0_8px_30px_rgba(201,169,97,0.35)] md:bottom-8 md:right-8"
    >
      <MessageCircle size={22} strokeWidth={2} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/40" />
    </motion.a>
  );
}