import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Heart } from "lucide-react";
import ScratchCard from "./ScratchCard";
import Countdown from "./Countdown";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const timeline = [
  { time: "7:30 PM", label: "Guest Arrival & Welcome Drinks" },
  { time: "8:00 PM", label: "Wedding Ceremony" },
  { time: "8:30 PM", label: "Dinner & Celebration" },
];

export default function WeddingDetails() {
  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Pullman+Grand+Banquet+Hall+Kolonnawa";

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
      className="w-full max-w-md mx-auto px-6 pb-28 pt-10 text-center relative"
    >
      {/* Ornamental corner flourishes */}
      <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-skyBlue/50 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-skyBlue/50 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-skyBlue/50 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-skyBlue/50 rounded-br-xl pointer-events-none" />

      {/* Small monogram crest at top */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-4"
      >
        <img
          src="/images/monogram.png"
          alt="Sahla & Asry monogram"
          className="w-24 h-24 mx-auto object-contain"
        />
      </motion.div>

      {/* Bismillah */}
      <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
        <p className="font-arabic text-3xl text-deepBlue leading-relaxed">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="font-sans text-xs tracking-[0.4em] text-royalBlue mt-2 uppercase">
          In Sha Allah
        </p>
      </motion.div>

      <Divider />

      {/* Host line */}
      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="font-sans text-sm text-deepBlue/80 leading-relaxed"
      >
        Al-Haj Zarook &amp; Hajiyani Wajeeha
        <br />
        request the honour of your presence
        <br />
        at the Wedding Ceremony of their Daughter
      </motion.p>

      {/* Couple names with heart icon */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.7 }}
        className="my-9"
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <p className="font-serif italic text-5xl text-royalBlue leading-tight">
            Sahla
          </p>

          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-7 h-7 text-skyBlue fill-skyBlue" />
          </motion.span>

          <p className="font-serif italic text-5xl text-deepBlue leading-tight">
            Asry
          </p>
        </div>

        <p className="font-sans text-xs text-deepBlue/60 mt-3">
          (Son of Mr. Rafaideen and Mrs. Marsooka)
        </p>
      </motion.div>

      <Divider />

      {/* Date - Scratch Card */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="font-sans text-xs tracking-[0.3em] text-royalBlue uppercase mb-3">
          Thursday
        </p>

        <ScratchCard />
      </motion.div>

      {/* Countdown */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Countdown />
      </motion.div>

      <Divider />

      {/* Venue */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <p className="font-serif text-xl text-deepBlue">
          Pullman Grand Banquet Hall
        </p>

        <p className="font-sans text-sm text-deepBlue/70 mt-1">
          379 Kolonnawa Road, Kolonnawa
        </p>

        <p className="font-sans text-sm text-royalBlue mt-2 flex items-center justify-center gap-1.5">
          <Clock className="w-4 h-4" />
          From 7.30 PM Onwards
        </p>

        {/* Get Directions */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full bg-deepBlue text-white font-sans text-sm tracking-wide shadow-md active:scale-95 transition-transform"
        >
          <MapPin className="w-4 h-4" />
          Get Directions
        </a>
      </motion.div>

      <Divider />

      {/* Timeline */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="mb-8 text-left"
      >
        <p className="font-sans text-xs tracking-[0.3em] text-royalBlue uppercase mb-4 text-center">
          Event Schedule
        </p>

        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-skyBlue/40" />

          {timeline.map((item) => (
            <div key={item.time} className="relative">
              <span className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-skyBlue border-2 border-deepBlue" />

              <p className="font-serif text-deepBlue text-base">
                {item.time}
              </p>

              <p className="font-sans text-sm text-deepBlue/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <Divider />

      {/* RSVP */}
      <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
        <p className="font-sans text-xs tracking-[0.3em] text-royalBlue uppercase mb-3">
          RSVP
        </p>

        <p className="font-sans text-sm text-deepBlue/80 mb-3">
          Mr &amp; Mrs Zarook
        </p>

        <div className="flex flex-col gap-2 items-center">
          {/* Phone 1 */}
          <a
            href="tel:0714439169"
            className="inline-flex items-center gap-2 text-royalBlue font-sans text-sm"
          >
            <Phone className="w-4 h-4" />
            071 443 9169
          </a>

          {/* Phone 2 */}
          <a
            href="tel:0718174432"
            className="inline-flex items-center gap-2 text-royalBlue font-sans text-sm"
          >
            <Phone className="w-4 h-4" />
            071 817 4432
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-2 my-6">
      <span className="h-px w-10 bg-skyBlue/60" />
      <Heart className="w-3 h-3 text-skyBlue fill-skyBlue" />
      <span className="h-px w-10 bg-skyBlue/60" />
    </div>
  );
}