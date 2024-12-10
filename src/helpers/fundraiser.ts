import { formatDistance } from "date-fns";

const MAX_DATE = "9999-12-31T23:59:59Z";

interface Return {
  active: boolean;
  text?: {
    val: string;
    fore: string;
    bg: string;
  };
}

export const status = (
  expiry: string,
  active: boolean,
  progress: number
): Return => {
  if (!active)
    return {
      active: false,
      text: {
        val: "closed",
        fore: "text-red",
        bg: "bg-red-l4",
      },
    };

  if (expiry === MAX_DATE) return { active: true };

  const now = new Date();
  if (now.toISOString() > expiry)
    return {
      active: false,
      text: {
        val: progress ? "completed" : "expired",
        fore: "text-green",
        bg: "bg-green-l4",
      },
    };

  return {
    active: true,
    text: {
      val: `ends in ${formatDistance(new Date(expiry), now)}`,
      fore: "",
      bg: "",
    },
  };
};
