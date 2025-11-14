import { APP_NAME } from "constants/env";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const is_in_view = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!is_in_view) return;

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
  }, [is_in_view, end]);

  return (
    <p ref={ref} className="text-3xl text-center font-bold text-blue">
      {count.toLocaleString()}
      {suffix}
    </p>
  );
}

export function Stats({ classes = "" }) {
  return (
    <div
      className={`${classes} grid md:grid-cols-3 gap-8`}
      aria-label="Platform statistics"
    >
      <motion.article
        className="grid justify-items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring" }}
      >
        <CountUp end={6} suffix=" Million+" />
        <p className="max-w-md text-center mt-2 text-lg">
          Gifts processed across card, bank, stock, crypto, and DAF giving
          methods
        </p>
      </motion.article>
      <motion.article
        className="grid justify-items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        <CountUp end={24} suffix="%" />
        <p className="max-w-md text-center mt-2 text-lg">
          Avg annual investment returns, faithful to USCCB guidelines
        </p>
      </motion.article>
      <motion.article
        className="grid justify-items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <CountUp end={5} suffix="+" />
        <p className="max-w-md text-center mt-2 text-lg">
          Years providing free Catholic giving & fund management solutions
        </p>
      </motion.article>
    </div>
  );
}
