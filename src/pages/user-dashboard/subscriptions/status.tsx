import type { TStatus } from "lib/subscriptions";

interface IStatus {
  status: TStatus;
  classes?: string;
}

export function Status({ status, classes = "" }: IStatus) {
  const get_status_config = (status: TStatus) => {
    switch (status) {
      case "active":
        return {
          text: "Active",
          bg_color: "bg-green-l4",
          text_color: "text-green-d2",
          dot_color: "bg-green",
        };

      default:
        return {
          text: status satisfies "cancelled",
          bg_color: "bg-gray-l4",
          text_color: "text-gray-d2",
          dot_color: "bg-gray",
        };
    }
  };

  const config = get_status_config(status);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bg_color} ${config.text_color} ${classes}`}
    >
      <div className={`w-2 h-2 rounded-full ${config.dot_color}`} />
      {config.text}
    </div>
  );
}
