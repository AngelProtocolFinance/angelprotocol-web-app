import { useEffect, useState } from "react";

const MAX_TIME = 30;

type Props = {
  onClick: () => Promise<void>;
};

export default function ResendOTPTimer(props: Props) {
  const [remainingTime, setRemainingTime] = useState(MAX_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime === 0) {
        clearInterval(interval);
        return;
      }

      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return (
    <button
      type="button"
      className="text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray font-bold underline"
      onClick={async () => {
        // reset remaining time
        setRemainingTime(MAX_TIME);
        await props.onClick();
      }}
      disabled={remainingTime > 0}
    >
      00:{String(remainingTime).padStart(2, "0")}
    </button>
  );
}
