import { FaStopwatch } from "react-icons/fa";
import { useEffect, useState } from "react";
import formatTimer from "./formatTimer";

type Props = {
  deadline: string | number;
};

type FormattedProps = {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
};

export default function CountdownTimer({ deadline }: Props) {
  const [{ days, hours, minutes, seconds }, setFormattedDeadline] =
    useState<FormattedProps>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  useEffect(() => {
    const interval = setInterval(() => {
      const formatted = formatTimer(deadline);
      setFormattedDeadline(formatted);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [deadline]);

  return (
    <div className="flex items-center justify-center font-heading">
      <span className="text-xl font-semibold mr-1">{days}:</span>
      <span className="text-xl font-semibold mr-1">{hours}:</span>
      <span className="text-xl font-semibold mr-1">{minutes}:</span>
      <span className="text-xl font-semibold mr-3">{seconds}</span>
      <FaStopwatch />
    </div>
  );
}
