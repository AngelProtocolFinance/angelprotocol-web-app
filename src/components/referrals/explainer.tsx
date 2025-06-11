import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Link } from "@remix-run/react";
import ExtLink from "components/ext-link";
import { DrawerIcon } from "components/icon";
import { APP_NAME } from "constants/env";
import { referrals_hub } from "constants/urls";
import {
  BrainIcon,
  CheckIcon,
  LightbulbIcon as LightBulbIcon,
  LinkIcon,
  MessageCircleQuestionIcon as QuestionMarkCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

export function Explainer({ classes = "" }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className={`w-full ${classes}`}>
      <Disclosure defaultOpen={!isMobile}>
        {({ open }) => (
          <>
            <div className="flex items-center gap-x-1 mb-1 relative">
              <LightBulbIcon
                className="max-md:hidden text-blue-d1 shrink-0 absolute -left-6"
                size={19}
              />
              <h3 className="text-lg">About the {APP_NAME} Referral Program</h3>
            </div>
            <p>
              You can earn rewards by helping nonprofits discover {APP_NAME}.
              When a nonprofit signs up using your referral link or code, you'll
              earn 30% of the contributions made by donors to support {APP_NAME}{" "}
              — for the next 3 years.
            </p>
            {open && (
              <>
                <div className="flex items-start gap-3 mt-4 max-w-4xl relative">
                  <BrainIcon
                    size={18}
                    className="max-md:hidden text-blue-d text-[crimson] absolute -left-6 top-1"
                  />
                  <div>
                    <p>
                      {APP_NAME} doesn't charge fees — instead, donors can
                      choose to support our platform directly during checkout.
                      These donor contributions average around 5% of each
                      donation.
                    </p>
                    <p className="mt-2">
                      So if a nonprofit receives $100,000 in online donations,
                      donors typically contribute about $5,000 to {APP_NAME} —
                      and you'd earn $1,500 from that.
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 max-w-4xl">
                  <div className="flex items-start gap-2">
                    <CheckIcon
                      size={18}
                      className="text-green flex-shrink-0 mt-0.5"
                    />
                    <p>
                      Open to all {APP_NAME} users — including donors, nonprofit
                      staff, consultants, and fundraising pros
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon
                      size={18}
                      className="text-green flex-shrink-0 mt-0.5"
                    />
                    <p>Share your unique referral link or code</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckIcon
                      size={18}
                      className="text-green flex-shrink-0 mt-0.5"
                    />
                    <p>Track your referrals and payouts in this dashboard</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <Link
                    target="_blank"
                    to="/terms-of-use-referrals"
                    className="inline-flex items-center text-blue-d1 text-sm hover:text-blue-d2 font-medium"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" />
                    View Full Program Terms
                  </Link>
                  <ExtLink
                    href={referrals_hub}
                    className="inline-flex items-center text-blue-d1 text-sm hover:text-blue-d2 font-medium"
                  >
                    <QuestionMarkCircleIcon className="h-4 w-4 mr-1" />
                    Referral FAQ
                  </ExtLink>
                </div>
              </>
            )}

            <DisclosureButton
              className={`flex items-center justify-center text-blue-d1  ${open ? "mt-4" : "mt-2"}`}
            >
              <span className="text-sm font-medium mr-1">
                {open ? "Show less" : "Read more"}
              </span>
              <DrawerIcon isOpen={open} size={18} />
            </DisclosureButton>
          </>
        )}
      </Disclosure>
    </div>
  );
}
