import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Envelope({ onOpen }) {
  const [breaking, setBreaking] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);

  const handleSealClick = () => {
    if (breaking) return;
    setBreaking(true);
    setTimeout(() => setFlapOpen(true), 500);
    setTimeout(() => onOpen(), 1400);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-cream via-paleBlue to-creamDark z-40 px-4">
      <div className="relative w-full max-w-sm aspect-[4/5]">
        {/* Envelope body */}
        <div className="absolute inset-0 rounded-md shadow-2xl bg-white border-2 border-skyBlue overflow-hidden">
          <div className="absolute inset-3 border border-skyBlue/60 rounded-sm pointer-events-none" />
          <div className="absolute inset-4 border border-dashed border-royalBlue/30 rounded-sm pointer-events-none" />

          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-paleBlue"
            style={{ clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 100%, 0 100%)" }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center">
            <p className="font-sans text-[11px] tracking-[0.3em] text-deepBlue/70 uppercase">
              You're Invited
            </p>
            <p className="font-serif text-2xl text-deepBlue mt-2">Sahla &amp; Asry</p>
          </div>
        </div>

        {/* Top flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 origin-top bg-paleBlue border-b border-skyBlue/50 z-20"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", transformStyle: "preserve-3d" }}
          animate={flapOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div
            className="absolute inset-3 border border-skyBlue/50"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 88%)" }}
          />
        </motion.div>

        {/* Wax seal with monogram image */}
        <AnimatePresence>
          {!flapOpen && (
            <motion.button
              onClick={handleSealClick}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-skyBlue overflow-hidden p-2"
              whileTap={{ scale: 0.9 }}
              animate={
                breaking
                  ? { scale: [1, 1.3, 0], rotate: [0, 15, 0] }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                breaking
                  ? { duration: 0.5, ease: "easeInOut" }
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <img
                src="/images/monogram.png"
                alt="Sahla & Asry"
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {!flapOpen && (
          <motion.p
            className="absolute -bottom-10 inset-x-0 text-center font-sans text-xs tracking-widest text-deepBlue/60 uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap the seal to open
          </motion.p>
        )}
      </div>
    </div>
  );
}