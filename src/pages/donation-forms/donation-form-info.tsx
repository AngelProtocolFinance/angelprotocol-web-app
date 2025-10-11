import { StepsCarousel } from "./components/steps-carousel";

export function DonationFormInfo({ classes = "" }) {
  return (
    <section className={`${classes} grid content-start`}>
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        Your all-in-one donation form
      </h4>
      <h2 className="col-span-full text-center text-4xl xl:text-4.5xl mb-4">
        Raise more. Save more. Do less.
      </h2>
      <p className="col-span-full mb-4 text-center text-xl text-navy">
        100% free. No setup costs, no recurring charges, no platform fees.
      </p>

      <StepsCarousel classes="w-full max-w-lg self-center justify-self-center" />
    </section>
  );
}
