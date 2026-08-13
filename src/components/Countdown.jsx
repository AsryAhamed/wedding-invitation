import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Wedding: Thursday, 24 September 2026, 7:30 PM (Sri Lanka time, UTC+5:30)
const WEDDING_DATE = new Date("2026-09-24T19:30:00+05:30").getTime();

function getTimeLeft() {
  const diff = WEDDING_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time.done) {
    return (
      <p className="font-serif text-xl text-deepBlue">Today is the day! 💙</p>
    );
  }

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <div className="w-full max-w-sm mx-auto">
      <p className="font-sans text-xs tracking-[0.3em] text-royalBlue uppercase mb-3">
        Counting Down To Our Big Day
      </p>
      <div className="grid grid-cols-4 gap-2">
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-lg bg-gradient-to-b from-deepBlue to-[#0F274D] border border-skyBlue/40 py-3 px-1 shadow-md"
          >
            <motion.p
              key={u.value}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-2xl sm:text-3xl text-skyBlue leading-none"
            >
              {String(u.value).padStart(2, "0")}
            </motion.p>
            <p className="font-sans text-[10px] tracking-widest text-white/70 uppercase mt-1">
              {u.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}