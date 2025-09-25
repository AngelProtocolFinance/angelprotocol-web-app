import { ExtLink } from "components/ext-link";
import { referrals_hub } from "constants/urls";
import { ArrowRight } from "lucide-react";

export function Faq({ classes = "" }) {
  return (
    <section className={`${classes} grid`}>
      <h4 className="text-2xl/tight md:text-3xl/tight text-center mb-2">
        Frequently Asked Questions:
      </h4>
      <p className="px-6 max-w-5xl mx-auto md:text-xl text-gray-d1 text-pretty mb-10">
        Understand how you can earn while making a difference, here’s how it
        works.
      </p>

      <ul className="list-disc pl-5 space-y-4 text-lg">
        <li className="">
          <strong className="font-heading">Who can join?</strong>
          <p className="text-gray-d1">
            Anyone with a Better Giving account - donors, consultants,
            influencers, nonprofits.
          </p>
        </li>

        <li className="">
          <strong className="font-heading">How do I earn rewards?</strong>
          <p className="text-gray-d1">
            Share your link, and you earn whenever a referred nonprofit receives
            donations.
          </p>
        </li>

        <li className="">
          <strong className="font-heading">When will I get paid?</strong>
          <p className="text-gray-d1">
            We process payouts monthly, directly to your account.
          </p>
        </li>

        <li>
          <strong className="font-heading">
            What if a nonprofit forgets to use my link?
          </strong>
          <p className="text-gray-d1">
            They can manually enter your referral code during signup.
          </p>
        </li>
        <li>
          <strong className="font-heading">
            Why would a nonprofit want to use Better Giving?
          </strong>
          <p className="text-gray-d1">
            Better Giving helps nonprofits increase donations with modern tools
            for donor engagement, easy online giving, and access to a growing
            network of supporters. It's free to join, and they keep 100% of
            their donations no hidden fees or cuts.
          </p>
        </li>
      </ul>
      <ExtLink
        href={referrals_hub}
        className="justify-self-center flex mt-8 items-center gap-x-2 text-blue hover:text-blue-d1 md:text-lg font-semibold"
      >
        <span>Complete FAQs</span>
        <ArrowRight size={15} />
      </ExtLink>
    </section>
  );
}
