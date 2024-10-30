import quotation from "assets/icons/quotation.svg";
export function Quote({ className = "" }) {
  return (
    <section
      className={`${className} grid justify-items-center gap-10 @6xl:justify-items-start @6xl:grid-cols-2 py-24`}
    >
      <div className="max-w-2xl">
        <h4 className="text-center @6xl:text-left @6xl:text-lg uppercase text-blue-d1 mb-5">
          Philanthropy Reimagined
        </h4>
        <h2 className="text-center @6xl:text-left text-3xl @6xl:text-4xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
          Why We Do What We Do
        </h2>
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

      <div className="self-center p-8 pb-2 mt-4 max-w-3xl relative">
        <div className="w-2 shadow-inner h-full absolute inset-y-0 left-0 bg-lilac/50 rounded-full" />
        <img
          src={quotation}
          alt="quotation mark"
          className="justify-self-start w-24 lg:w-36 mb-4 -mt-24"
        />
        <blockquote className="text-xl sm:text-2xl font-medium text-navy-l3 italic mb-2 font-heading">
          Our mission is to give every nonprofit, everywhere, free access to the
          financial tools they need to grow and thrive. <br />
          <br />
          We believe a new model of philanthropy is possible, not based on
          scarcity and dependence but rather abundance and financial
          self-sufficiency
        </blockquote>
        <p className="text-right text-lg text-navy mt-8">
          – Chauncey St. John
          <span className="block text-sm font-medium">Founder</span>​
        </p>
      </div>
    </section>
  );
}
