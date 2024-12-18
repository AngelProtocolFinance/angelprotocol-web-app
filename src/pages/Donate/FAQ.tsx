import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import ExtLink from "components/ExtLink";
import { DrawerIcon } from "components/Icon";
import { appRoutes } from "constants/routes";
import { Fragment, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props {
  classes?: string;
}

export default function FAQ({ classes = "" }: Props) {
  return (
    <div
      className={
        classes +
        " md:bg-white md:border md:border-gray-l4 md:p-4 md:rounded-lg grid gap-2 md:gap-4"
      }
    >
      <h2 id="faqs">Frequently asked questions</h2>
      {faqs.map((faq) => (
        <Disclosure as="div" key={faq.id}>
          {({ open }) => (
            <>
              <DisclosureButton className="flex items-start justify-between gap-2 mb-2 w-full">
                <span
                  className={`text-left text-sm ${open ? "font-semibold" : ""}`}
                >
                  {faq.question}
                </span>
                <DrawerIcon size={18} isOpen={open} className="shrink-0" />
              </DisclosureButton>
              {open && (
                <DisclosurePanel
                  as="div"
                  static
                  className="text-sm grid gap-3 text-navy-l1 mb-6"
                >
                  {faq.paragraphs.map((p, idx) => (
                    <Fragment key={idx}>{p}</Fragment>
                  ))}
                </DisclosurePanel>
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
        Better Giving handles all donation processing and reporting, and grants
        your donation 100% to the charitable organization you selected. This
        streamlines efforts and saves costs for the nonprofit you're supporting.
      </p>,
      <p>
        All nonprofits using Better Giving also have free access to high-yield
        savings and managed investment funds, meaning they can put your donation
        to work to provide for their future. When you give today, you give
        forever.
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
        includes any transaction fee they have incurred.
      </p>,
      <p>
        All Donors are encouraged to consult with their tax preparer regarding
        the specific deductibility of their contribution(s).
      </p>,
      <p>
        Donors will need to provide KYD (know your donor) information including
        name and address, and can download an annualized cumulative report of
        all donations provided to nonprofits within Better Giving through their
        'My Donation' page. Donors can also request further copies of their tax
        receipt.
      </p>,
      <p>
        To keep a permanent record of all your donations and print tax receipts,
        create your own personal user account{" "}
        <Link to={appRoutes.signup} className="text-blue hover:text-blue-l1">
          here
        </Link>
      </p>,
      <p>
        Here is a short video showing how to do that:{" "}
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
        It is free to set up and use a Better Giving account. No subscriptions.
        No upfront costs. No platform fees (unless a nonprofit has opted out of
        offering donors a voluntary donation to Better Giving).
      </p>,
      <p>Payment processing fees from 3rd parties may apply.</p>,
    ],
  },
  {
    id: 4,
    question: "How do I donate by Check?",
    paragraphs: [
      <p className="leading-normal">
        For gifts by check: Make your check out to{" "}
        <Em classes="text-navy-d4">
          Altruistic Partners Empowering Society Inc
        </Em>
        and send it to:{" "}
        <Em intensity={1} classes="text-navy-d4 block mt-2">
          Miscellaneous Account Services
          <br /> PNC Bank
          <br /> P.O. Box 161019
          <br /> Rocky River, OH 44116-7019
        </Em>
      </p>,
      <p>
        If you would like to add a contribution for Better Giving to help keep
        our services free, you may add that in the memo with{" "}
        <Em
          intensity={1}
          classes="text-navy-d4 text-xs font-mono bg-blue-l4 p-0.5"
        >
          BG:&nbsp;Amount
        </Em>
        .
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
            : "font-semibold text-navy-d4"
      } ${classes}`}
    >
      {children}
    </span>
  );
}
