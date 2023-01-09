export default function WidgetConfigurer() {
  return (
    <div className="grid gap-10 w-full h-full">
      <section className="flex flex-col gap-3 w-full">
        <h1 className="text-lg sm:text-2xl font-heading font-bold">
          Accept donations from your website today!
        </h1>
        <div className="w-3/5 font-body text-sm sm:text-base">
          <p>
            Just configure your widget below, copy & paste the code on your
            website and you're ready to go!
            {/** TODO: update the page to display steps to do this */}
          </p>
          <p>
            Your donors will be able to connect their crypto wallets and use
            them to donate directly.
          </p>
        </div>
      </section>
    </div>
  );
}
