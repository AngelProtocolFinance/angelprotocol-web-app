import { MAX_EXPIRATION } from "@better-giving/fundraiser";
import { formatDistance } from "date-fns";
import { unpack } from "helpers";

interface IStatus {
  active: boolean;
  text?: "closed" | "completed" | "expired" | (string & {});
}

export const status = (
  expiry: string | undefined,
  active: boolean,
  progress: number
): IStatus => {
  if (!active) return { active: false, text: "closed" };

  if (!expiry || expiry === MAX_EXPIRATION) return { active: true };

  const now = new Date();
  if (now.toISOString() > expiry)
    return {
      active: false,
      text: progress ? "completed" : "expired",
    };

  return {
    active: true,
    text: `ends in ${formatDistance(new Date(expiry), now)}`,
  };
};

interface IFundStatus {
  classes?: {
    container?: string;
    inactive?: string;
    expired?: string;
    completed?: string;
    active?: string;
  };
  status: IStatus;
}

export const FundStatus = (props: IFundStatus) => {
  const s = unpack(props.classes);
  if (!props.status.text) return null;
  const style = ((t) => {
    switch (t) {
      case "closed":
        return s.inactive;
      case "completed":
        return s.completed;
      case "expired":
        return s.expired;
      default:
        return s.active;
    }
  })(props.status.text);

  return <div className={`${s.container} ${style}`}>{props.status.text}</div>;
};
