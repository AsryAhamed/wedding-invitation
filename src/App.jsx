import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./components/Envelope";
import WeddingDetails from "./components/WeddingDetails";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [opened, setOpened] = useState(false);
  const audioPlayerRef = useRef(null);

  const handleOpen = () => {
    setOpened(true);
    audioPlayerRef.current?.play();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-paleBlue via-cream to-paleBlue relative">
      <AudioPlayer ref={audioPlayerRef} />

      <AnimatePresence>
        {!opened && <Envelope onOpen={handleOpen} />}
      </AnimatePresence>

      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 min-h-screen"
        >
          {/* Ambient glow blobs behind the card */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-skyBlue/25 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 w-56 h-56 bg-royalBlue/20 rounded-full blur-3xl" />

          {/* Card frame */}
          <div className="max-w-md mx-4 sm:mx-auto mt-6 mb-10 border-2 border-skyBlue/60 rounded-2xl shadow-2xl bg-white relative overflow-hidden">
            {/* Inner double-border for a richer, layered look */}
            <div className="absolute inset-2 border border-royalBlue/25 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 border border-dashed border-skyBlue/40 rounded-lg pointer-events-none" />

            {/* Subtle top gold-style band replaced with deep blue */}
            <div className="h-2 w-full bg-gradient-to-r from-skyBlue via-royalBlue to-deepBlue" />

            <WeddingDetails />

            <div className="h-2 w-full bg-gradient-to-r from-deepBlue via-royalBlue to-skyBlue" />
          </div>
        </motion.div>
      )}
    </div>
  );
}