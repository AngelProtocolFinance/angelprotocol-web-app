import { ToastContentProps, toast } from "react-toastify";
import ExtLink from "components/ExtLink";

const mailers = ["gmail browser", "outlook browser", "default app"] as const;
type MailerType = typeof mailers[number];

export default function Mailer({
  data,
  closeToast,
}: ToastContentProps<string>) {
  const report = data!;
  return (
    <div className="grid text-gray-d2 dark:text-white gap-2">
      {mailers.map((type) => (
        <MailLink key={type} type={type} report={report} />
      ))}

      <button
        type="button"
        onClick={closeToast}
        className="btn-orange font-work py-2 mt-4"
      >
        dismiss
      </button>
    </div>
  );
}

function MailLink(props: { type: MailerType; report: string }) {
  const to = "support@angelprotocol.io";
  const subject = "Angel Protocol Error";
  const url = ((type): URL => {
    switch (type) {
      case "gmail browser": {
        const url = new URL("https://mail.google.com/mail");
        url.searchParams.append("view", "cm");
        url.searchParams.append("fs", "1");
        url.searchParams.append("to", to);
        url.searchParams.append("su", subject);
        url.searchParams.append("body", props.report);
        return url;
      }
      case "outlook browser": {
        const url = new URL("https://outlook.office.com/owa/");
        url.searchParams.append("path", "/mail/action/compose");
        url.searchParams.append("to", to);
        url.searchParams.append("subject", subject);
        url.searchParams.append("body", props.report);
        return url;
      }

      default: {
        const url = new URL(`mailto:${to}`);
        url.searchParams.append("subject", subject);
        url.searchParams.append("body", props.report);
        return url;
      }
    }
  })(props.type);
  return (
    <ExtLink
      href={url.toString()}
      className="rounded btn-outline-filled font-work font-normal justify-start"
    >
      {props.type}
    </ExtLink>
  );
}

export function openMailer(report: string) {
  return toast.info(Mailer, {
    icon: false,
    data: report,
    className: "",
    autoClose: false,
    closeButton: false,
  });
}
