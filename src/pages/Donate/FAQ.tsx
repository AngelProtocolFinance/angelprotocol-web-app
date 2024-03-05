import { Disclosure } from "@headlessui/react";
import ExtLink from "components/ExtLink";
import { DrawerIcon } from "components/Icon";
import { appRoutes } from "constants/routes";
import { Fragment, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export default function FAQ({ classes = "" }) {
  return (
    <div
      className={
        classes +
        " md:border md:border-gray-l4 md:p-4 rounded grid gap-2 md:gap-4"
      }
    >
      <h2 className="text-sm" id="faqs">
        Frequently asked questions
      </h2>
      {faqs.map((faq) => (
        <Disclosure as="div" key={faq.id}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-start justify-between gap-2 mb-2 w-full">
                <span
                  className={`text-left text-sm ${open ? "font-semibold" : ""}`}
                >
                  {faq.question}
                </span>
                <DrawerIcon
                  isOpen={open}
                  className="shrink-0 -mt-0.5 text-xl"
                />
              </Disclosure.Button>
              {open && (
                <Disclosure.Panel
                  as="div"
                  static
                  className="text-sm grid gap-3 text-gray-d1 mb-6"
                >
                  {faq.paragraphs.map((p, idx) => (
                    <Fragment key={idx}>{p}</Fragment>
                  ))}
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

const faqs = [
  {
    id: 1,
    question: "How does my donation work to benefit nonprofits?",
    paragraphs: [
      <p>
        Donations are made to Altruistic Partners Empowering Society, DBA Better
        Giving. This is a US 501(c) (3) non profit.
      </p>,
      <p>
        <Em intensity={2}>For immediate donations</Em>, Better Giving grants out
        the donations to the chosen nonprofit on a weekly basis.
      </p>,
      <p>
        <Em intensity={2}>For Sustainability Fund donations</Em>, these are
        invested as a Board Managed quasi-endowment, and Better Giving grants
        out 75% of the yield every quarter to the nonprofit, investing the other
        25% of the yield into the sustainability fund to mitigate against such
        as inflation. In this way, donors can give today, but see the impact
        continue into the future.
      </p>,
    ],
  },
  {
    id: 2,
    question: "Can I receive a tax receipt?",
    paragraphs: [
      <p>Yes, you can!</p>,
      <p>
        To the extent permitted by law in their own country or state, Donors are
        entitled to a tax receipt for the full amount of their donation, which
        includes any transaction fee they have incurred. For example, if a donor
        makes a donation of $100, and incurs an additional $5 fee to make the
        transaction, they will receive a tax receipt for $105, as that is the
        amount they are able to claim as a charitable deduction. All Donors are
        encouraged to consult with their tax preparer regarding the specific
        deductibility of their contribution(s).
      </p>,
      <p>
        Donors will need to provide KYD (know your donor) information including
        name and address, and can download an annualized cumulative report of
        all donations provided to nonprofits within Better Giving through their
        'my donation' page. Donors can also request further copies of their tax
        receipt.
      </p>,
      <p>
        To keep a permanent record of all your donations and print tax receipts,
        create your own personal user account&nbsp;
        <Link to={appRoutes.signin} className="text-blue hover:text-blue-l1">
          here
        </Link>
        .
      </p>,
      <p>
        Here's a short video showing how to do that:{" "}
        <ExtLink
          href="https://youtu.be/74kEk7aQauA"
          className="text-blue hover:text-blue-l1"
        >
          https://youtu.be/74kEk7aQauA
        </ExtLink>
      </p>,
    ],
  },
  {
    id: 3,
    question: "How much does Better Giving charge?",
    paragraphs: [
      <p>
        It is free to set up and start using a Better Giving account. Better
        Giving only receives fees after donations have been received. There are
        NO ongoing fees to any nonprofits.
      </p>,
      <p>
        The fees are as follows and are charged at the point of donation. They
        are very competitive in comparison with other routes, and the Fiscal
        Sponsorship fee compares to a market standard of 4-10% !
      </p>,
      <p>
        <Em intensity={3} classes="block mb-2">
          For donations to US registered 501c3 accounts:
        </Em>
        <Em>Crypto donations</Em> - 2.9% of each donation
        <div className="mb-2" />
        <Em>Fiat donations</Em> (dollars, pounds, euros etc) - 1.5% (plus
        external processing fees of 2.9% +$0.30 per donation)
      </p>,
      <p>
        <Em intensity={3} classes="block mb-2">
          For fiscally sponsored accounts (mainly non-US charities):
        </Em>
        <Em>Fiscal Sponsorship fee</Em> - 2.9%
        <div className="mb-2" />
        <Em>Crypto donations</Em> - 2.9% of each donation
        <div className="mb-2" />
        <Em>Fiat donations</Em> (dollars, pounds, euros etc) - 1.5% (plus
        external processing fees of 2.9% +$0.30 per donation)
      </p>,
      <p>
        Blockchain transaction fees may apply, but these can be fractions of a
        cent depending on the chain.
      </p>,
      <p className="font-semibold">
        All fees applied are shown before any donation is made.
      </p>,
    ],
  },
];

function Em({
  classes = "",
  children,
  intensity = 1,
}: PropsWithChildren & { intensity?: 1 | 2 | 3; classes?: string }) {
  return (
    <span
      className={`${
        intensity === 1
          ? "font-medium"
          : intensity === 2
            ? "font-semibold"
            : "font-semibold text-gray-d2"
      } ${classes}`}
    >
      {children}
    </span>
  );
}
