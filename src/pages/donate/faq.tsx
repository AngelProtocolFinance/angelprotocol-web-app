import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ExtLink } from "components/ext-link";
import { DrawerIcon } from "components/icon";
import { Fragment, type PropsWithChildren } from "react";
import { Link, href } from "react-router";

interface Props {
  classes?: string;
}

export function FAQ({ classes = "" }: Props) {
  return (
    <div
      className={`${classes} md:bg-white md:border md:border-gray-l3 md:p-4 md:rounded-lg grid gap-2 md:gap-4`}
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
                <DrawerIcon size={18} is_open={open} className="shrink-0" />
              </DisclosureButton>
              {open && (
                <DisclosurePanel
                  as="div"
                  static
                  className="text-sm grid gap-3 text-gray mb-6"
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
      <p>
        Yes! We will email you a tax receipt immediately after your donation.
      </p>,
      <p>
        To ensure deductibility, please check with your tax advisor, as rules
        vary by country and state.
      </p>,
      <p>
        To access your receipts or a year-end donation summary,{" "}
        <Link to={href("/signup")} className="text-blue hover:text-blue-l1">
          create a free donor account
        </Link>{" "}
        (
        <ExtLink
          href="https://youtu.be/74kEk7aQauA"
          className="text-blue hover:text-blue-l1"
        >
          video guide
        </ExtLink>
        ).
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
        <Em classes="text-gray-d4">
          Altruistic Partners Empowering Society Inc
        </Em>
        and send it to:{" "}
        <Em intensity={1} classes="text-gray-d4 block mt-2">
          Miscellaneous Account Services
          <br /> PNC Bank
          <br /> P.O. Box 161019
          <br /> Rocky River, OH 44116-7019
        </Em>
      </p>,
      <p>
        IMPORTANT: Add the name of the Nonprofit you are donating to in the
        memo.
      </p>,
      <p>
        If you would like to add a contribution for Better Giving to help keep
        our services free, you may add that in the memo with{" "}
        <Em
          intensity={1}
          classes="text-gray-d4 text-xs font-mono bg-blue-l4 p-0.5"
        >
          BG:&nbsp;$amount
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
            : "font-semibold text-gray-d4"
      } ${classes}`}
    >
      {children}
    </span>
  );
}
