import { useEffect, useState } from "react";
import formatTimer from "./formatTimer";

type Props = {
  deadline: string | number;
  start: number | any;
};

type FormattedProps = {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
};

export default function CountdownTimer({ deadline, start }: Props) {
  const [{ days, hours, minutes, seconds }, setFormattedDeadline] =
    useState<FormattedProps>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  const [showZeroValues, setShowZeroValues] = useState(false);

  useEffect(() => {
    if (!deadline) {
      setShowZeroValues(true);
      return;
    }
    if (showZeroValues) setShowZeroValues(false);

    const interval = setInterval(() => {
      const formatted = formatTimer(deadline, start);
      setFormattedDeadline(formatted);
      if (
        formatted.days === 0 &&
        formatted.hours === 0 &&
        formatted.minutes === 0 &&
        formatted.seconds === 0
      ) {
        setShowZeroValues(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline, showZeroValues]);
  return (
    <div className="flex items-center justify-center font-heading">
      <span className="font-semibold mr-1">
        {showZeroValues ? "00" : days}:
      </span>
      <span className="font-semibold mr-1">
        {showZeroValues ? "00" : hours}:
      </span>
      <span className="font-semibold mr-1">
        {showZeroValues ? "00" : minutes}:
      </span>
      <span className="font-semibold mr-2">
        {showZeroValues ? "00" : seconds}
      </span>
    </div>
  );
}
