"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function MatchModal({ show, onClose }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 140, damping: 15 }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-auto border border-[var(--color-primary-light)]"
          >
            <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">
              Conecta vuestros futuros 🐾
            </h2>
            <p className="text-zinc-600 mb-7">
              ¡Has hecho match con tu nuevo amigo peludo!
            </p>

            <div className="flex justify-center gap-4">
              {/* 🩷 Botón rosa con texto blanco */}
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full font-semibold shadow-sm 
                          bg-gradient-to-r from-pink-500 to-pink-600 
                          text-white 
                          hover:from-pink-600 hover:to-pink-700 
                          hover:shadow-md active:scale-95 transition-all"
              >
                Contactar protectora
              </Link>

              {/* 💚 Botón verde bordeado */}
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full font-semibold border border-[var(--color-primary)] 
                          text-[var(--color-primary)] bg-white 
                          hover:bg-[var(--color-primary)] hover:text-white 
                          hover:shadow-md active:scale-95 transition-all"
              >
                Seguir viendo
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
