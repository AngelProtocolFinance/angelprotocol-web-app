import { useEffect, useState } from "react";

type Props = {
  onClick: () => Promise<void>;
};

export default function ResendOTPTimer(props: Props) {
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      type="button"
      className="text-blue-d1 hover:text-blue active:text-blue-d2 disabled:text-gray font-bold underline"
      onClick={props.onClick}
      disabled={remainingTime > 0}
    >
      00:{String(remainingTime).padStart(2, "0")}
    </button>
  );
}
