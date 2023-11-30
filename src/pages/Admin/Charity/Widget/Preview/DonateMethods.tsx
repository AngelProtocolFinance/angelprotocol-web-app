import { Tab } from "@headlessui/react";
import DAFImg from "assets/images/DAFDirect.png";
import Image from "components/Image";
import { useGetter } from "store/accessors";
import { appRoutes } from "constants/routes";
import DonaterSample from "./DonaterSample";
import StripeSample from "./StripeSample";

const tabClasses = (selected: boolean) =>
  `${
    selected
      ? "border-orange text-orange"
      : "border-gray-l3 dark:border-bluegray"
  } uppercase p-2 border-b-4 hover:text-orange-l1 hover:border-orange-l1`;

export default function DonateMethods({ classes = "" }) {
  const widgetConfig = useGetter((state) => state.widget);

  return (
    <Tab.Group as="div" className={`${classes} grid content-start mt-2`}>
      <Tab.List className="grid grid-cols-2 sm:grid-cols-4 mb-6">
        <Tab className={({ selected }) => tabClasses(selected)}>
          Credit/Debit
        </Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Crypto</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>Stocks</Tab>
        <Tab className={({ selected }) => tabClasses(selected)}>DAF</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <StripeSample {...widgetConfig} />
        </Tab.Panel>
        <Tab.Panel>
          <DonaterSample {...widgetConfig} />
        </Tab.Panel>
        <Tab.Panel className="grid gap-5">
          <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
            Stocks
          </h3>
          {/* contact broker info */}
          <h4 className="text-lg sm:text-xl leading-relaxed">
            Step 1: Contact Your Broker
          </h4>
          <p>
            To donate stock, please email or provide your broker with the
            following information:
          </p>
          <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
            <p>Please transfer [X] shares of [ABC] to:</p>
            <p>Deliver to: Fidelity Investments</p>
            <p>DTC number: 0226</p>
            <p>Account number: Z40390069</p>
            <p>Account name: Altruistic Partners Empowering Society, Inc</p>
            <p>
              Reference: [Internal Ref#, if needed]{" "}
              {widgetConfig.endowment.name} (
              {window.location.origin +
                appRoutes.marketplace +
                `${widgetConfig.endowment.id}`}
              )
            </p>
          </div>
          <p> You may also need the following information:</p>
          <span className="rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
            Better.Giving is a non-profit with 501(c)(3) tax-exempt status,
            Federal ID #: 87-3758939.
          </span>
          <p className="text-sm font-bold">
            We can help with the email you'll need to send to your broker
            ensuring they have all the necessary information. Complete the form
            below and click "Build Email" to generate a ready-to-send email in
            your default email application. All fields are optional, but the
            more you can provide now the less editing will be needed before
            sending.
          </p>

          <div className="btn-orange btn-donate my-4 w-1/2 justify-self-center">
            Build Email
          </div>

          <h4 className="text-lg sm:text-xl leading-relaxed">
            Step 2: Let Us Know
          </h4>
          <div className="grid gap-2">
            <p>
              For your gift to be recognized when it comes into our account,
              please email us details of the shares you are donating and which
              project or projects to designate your donation to. Please send
              this email to support@better.giving.
            </p>
            <i>
              If you generated an email with the above form, then we should have
              been "CC'd" automatically on the email to your broker.
            </i>
          </div>
          {/* additional info */}
          <h4 className="text-lg sm:text-xl leading-relaxed">
            Benefits of Donating Appreciated stock
          </h4>
          <p>
            You can enjoy significant tax advantages and maximize the size of
            your contributions when you transfer securities through
            Better.Giving:
          </p>
          <div className="grid rounded bg-gray-l5 dark:bg-bluegray-d1 p-2">
            <span className="text-sm text-gray">
              NOTE: This is not financial advice! Please speak to your tax
              advisor or broker about your specific situation and country's tax
              laws.
            </span>
          </div>
          <p>
            If you held the stock for at least one year, you receive a tax
            deduction for the full value of the stock at the time of donation
            (not just the amount you paid for the stock).
          </p>
          <p>
            You avoid paying both capital gains tax and stock sales commissions.
            When you give appreciated stocks directly to charity, your gift can
            be up to 20% larger because you avoid the taxes you'd incur from
            selling and donating the cash.
          </p>
        </Tab.Panel>
        <Tab.Panel className="grid place-items-center gap-5">
          <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
            DAFDirect
          </h3>
          <p className="text-center">
            Donation using DAFDirect widget direct to Better Giving.
          </p>
          <Image src={DAFImg} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
