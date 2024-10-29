export function Quote({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-y-10 @6xl:justify-items-start @6xl:grid-cols-[3fr_2fr] py-24`}
    >
      <div className="max-w-2xl order-2 @6xl:order-1">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-navy-d4 mb-5">
          Philanthropy Reimagined
        </h4>
        <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
          Why We Do What We Do
        </h1>
        <p className="mb-10 text-lg text-center @6xl:text-left">
          Founded in 2021 to help nonprofits become more financially resilient,
          Better Giving was born from a vision to equip organizations with the
          tools they need for financial independence. We saw how vulnerable
          organizations were, and know how difficult it can be to build up
          reserves from a place of scarcity. From offering free donation
          processing to providing no-barrier savings & investment services, our
          mission has always been about empowering nonprofits.
        </p>
        <p className="mb-10 text-lg text-center @6xl:text-left">
          Since our founding, we’ve helped nonprofits around the world raise
          over $6 million and grow their financial reserves. As a nonprofit
          ourselves, we understand the challenges our partners face and operate
          with full transparency.
        </p>
      </div>

      <blockquote className="order-1 @6xl:order-2 self-center">
        "Our mission is to give every nonprofit, everywhere, free access to the
        financial tools they need to grow and thrive. We believe a new model of
        philanthropy is possible, not based on scarcity and dependence but
        rather abundance and financial self-sufficiency" – Chauncey St. John,
        Founder​.
      </blockquote>
    </section>
  );
}
