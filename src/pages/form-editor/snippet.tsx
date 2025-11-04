import { Copier } from "components/copier";
import { CodeIcon } from "lucide-react";

type Props = {
  classes?: string;
  src: string;
};
export function Snippet({ classes = "", src }: Props) {
  /** allow payment https://docs.stripe.com/payments/payment-methods/pmd-registration?dashboard-or-api=dashboard#using-an-iframe */
  const iframe_url = `<iframe src="${src}" width="700" height="900" allow="payment" style="border: 0px;"></iframe>`;

  return (
    <div className={`${classes} relative`}>
      <p className="absolute -top-6 text-sm flex items-center gap-x-1 mb-1">
        <CodeIcon size={16} className="stroke-gray-d1" />
        <span>Copy snippet below and paste into your website</span>
      </p>
      <div className="flex p-4 rounded bg-gray-l3 divide-x divide-gray-l2">
        <code className="w-full text-sm font-mono break-all block pr-2">
          {iframe_url}
        </code>
        <Copier
          classes={{
            icon: "size-5 hover:text-blue-d1",
            container: "ml-2",
          }}
          text={iframe_url}
        />
      </div>
    </div>
  );
}
