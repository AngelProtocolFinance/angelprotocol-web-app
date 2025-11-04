import { Copier } from "components/copier";

type Props = {
  classes?: string;
  src: string;
};
export function Snippet({ classes = "", src }: Props) {
  /** allow payment https://docs.stripe.com/payments/payment-methods/pmd-registration?dashboard-or-api=dashboard#using-an-iframe */
  const iframe_url = `<iframe src="${src}" width="700" height="900" allow="payment" style="border: 0px;"></iframe>`;

  return (
    <div className={classes}>
      <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
        Copy / paste this code snippet:
      </h2>
      <div className="flex items-center justify-center gap-x-4 max-w-xl px-10 rounded-sm bg-gray-l3 dark:bg-blue-d4 @4xl/widget:mx-auto">
        <div className="w-full text-sm sm:text-base font-mono break-all py-4">
          {iframe_url}
        </div>
        <Copier
          classes={{ icon: "w-10 h-10 hover:text-blue-d1" }}
          text={iframe_url}
        />
      </div>
    </div>
  );
}
