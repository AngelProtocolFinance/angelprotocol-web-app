import { laira } from "assets/laira/laira";
import { useEffect, useState } from "react";

export default function Component() {
  const [time, setTime] = useState(120); // Start with 120 minutes (2 hours)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const startTime = new Date(now);
      startTime.setUTCHours(6, 30, 0, 0);
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

      if (now >= startTime && now < endTime) {
        const remaining = Math.floor(
          (endTime.getTime() - now.getTime()) / 60000
        );
        setTime(remaining);
      } else if (now < startTime) {
        setTime(120); // If before 6:30 UTC, show full 2 hours
      } else {
        setTime(0); // If after 8:30 UTC, show 0
      }
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
  };

  return (
    <div className="@container w-full max-w-4xl grid content-start">
      <h3 className="font-bold text-2xl mb-4">Dashboard</h3>
      <div className="flex items-center gap-2">
        <p className="mt-4 text-gray">
          Your new dashboard experience is underway
        </p>
        <img
          src={laira.jumping}
          className="h-10 object-contain"
          alt="Laira jumping"
        />
      </div>
      <p className="text-gray mt-2">
        Please bear with us while we bring final pieces together 🙏
      </p>
      <p className="text-gray text-sm mt-4">
        Changes are expected to be live in{" "}
        <span className="text-md font-bold">{formatTime(time)}</span>
      </p>
    </div>
  );
}
