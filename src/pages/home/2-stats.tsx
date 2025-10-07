import { APP_NAME } from "constants/env";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <p ref={ref} className="text-3xl text-center font-bold text-blue">
      {count.toLocaleString()}
      {suffix}
    </p>
  );
}

export function Stats({ classes = "" }) {
  return (
    <div className={`${classes} grid md:grid-cols-3 gap-8`}>
      <motion.div
        className="grid justify-items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <CountUp end={6} suffix=" Million+" />
        <p className="max-w-md text-center mt-2 text-lg">
          Raised across crypto, stock, DAF, and card donations for nonprofit
          members.
        </p>
      </motion.div>
      <motion.div
        className="grid justify-items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <CountUp end={24} suffix="%" />
        <p className="max-w-md text-center mt-2 text-lg">
          Raised across crypto, stock, DAF, and card donations for nonprofit
          members.
        </p>
      </motion.div>
      <motion.div
        className="grid justify-items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CountUp end={18000} suffix="+" />
        <p className="max-w-md text-center mt-2 text-lg">
          Causes discoverable across the {APP_NAME} directory.
        </p>
      </motion.div>
    </div>
  );
}
