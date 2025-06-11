import type Stripe from "stripe";

interface IStatus {
  status: Stripe.Subscription.Status;
  classes?: string;
}

export function Status({ status, classes = "" }: IStatus) {
  const getStatusConfig = (status: Stripe.Subscription.Status) => {
    switch (status) {
      case "active":
        return {
          text: "Active",
          bgColor: "bg-green-l4",
          textColor: "text-green-d2",
          dotColor: "bg-green",
        };
      case "trialing":
        return {
          text: "Trial",
          bgColor: "bg-blue-l4",
          textColor: "text-blue-d2",
          dotColor: "bg-blue",
        };
      case "past_due":
        return {
          text: "Past Due",
          bgColor: "bg-amber-l4",
          textColor: "text-amber-d2",
          dotColor: "bg-amber",
        };
      case "canceled":
      case "unpaid":
        return {
          text: status === "canceled" ? "Canceled" : "Unpaid",
          bgColor: "bg-red-l4",
          textColor: "text-red-d2",
          dotColor: "bg-red",
        };
      case "incomplete":
      case "incomplete_expired":
        return {
          text: "Incomplete",
          bgColor: "bg-gray-l4",
          textColor: "text-gray-d2",
          dotColor: "bg-gray",
        };
      default:
        return {
          text: status,
          bgColor: "bg-gray-l4",
          textColor: "text-gray-d2",
          dotColor: "bg-gray",
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} ${classes}`}
    >
      <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      {config.text}
    </div>
  );
}
