import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import alliance_member_badge from "assets/images/alliance-member-badge.png";
import laira_pointing from "assets/laira/laira-pointing.webp";
import laira_yellow from "assets/laira/laira-yellow.webp";
import { APP_NAME } from "constants/env";
import { motion } from "motion/react";

export function Manifesto({ classes = "" }) {
  return (
    <section className={`${classes} grid pb-40`}>
      <motion.div
        className="relative w-full max-w-4xl justify-self-center rounded-2xl border-t border-gray-l4 p-4 sm:p-12 shadow-2xl shadow-black/10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-xl:hidden absolute -left-32 isolate -bottom-5">
          <img src={laira_pointing} width={120} className="z-10 max-sm:w-24" />
          {/** shadow */}
          <svg
            className="absolute -bottom-4 left-0 z-0"
            width="100%"
            height="20"
          >
            <defs>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <ellipse
              cx="50%"
              cy="50%"
              rx="50"
              ry="8"
              filter="url(#blur)"
              className="fill-gray-l4"
              // className="blur-sm"
            />
          </svg>
        </div>
        <h2 className="text-center text-3xl xl:text-4.5xl leading-snug">
          <span className="text-blue">Membership</span> means belonging.
        </h2>
        <p className="text-center mb-8 col-span-full text-xl mt-4 max-w-5xl justify-self-center">
          Membership isn't a program, it's how we show up for each other. As a
          nonprofit ourselves, {APP_NAME} makes every nonprofit a Member by
          default, with shared tools, shared growth, and shared responsibility.
        </p>

        <TabGroup className="mt-4">
          <TabList className="flex mb-2 gap-x-1">
            <Tab className="focus:outline-none px-4 pb-2 font-bold text-lg data-selected:border-blue border-b-2 border-gray-l3">
              Your Rights
            </Tab>
            <Tab className="focus:outline-none px-4 pb-2 font-bold text-lg data-selected:border-blue border-b-2 border-gray-l3">
              Your Benefits
            </Tab>
            <Tab className="focus:outline-none px-4 pb-2 font-bold text-lg data-selected:border-blue border-b-2 border-gray-l3">
              Your Part
            </Tab>
          </TabList>

          <TabPanels className="mt-6">
            <TabPanel className="">
              <p className="text-lg xl:text-xl mb-4 font-bold">
                The {APP_NAME} Manifesto — your three rights:
              </p>
              <ul className="space-y-2 text-gray xl:text-lg list-disc list-inside">
                <li>
                  <span className="font-bold">Financial Self-Sufficiency</span>:
                  grow durable reserves; access tools for long-term stability.
                </li>
                <li>
                  <span className="font-bold">Equal Opportunity</span>: fair
                  access to modern fundraising & finance, regardless of size,
                  location, or cause.
                </li>
                <li>
                  <span className="font-bold">Organizational Autonomy</span>:
                  independence to allocate funds and reduce admin drag on your
                  terms.
                </li>
              </ul>
            </TabPanel>

            <TabPanel className="">
              <p className="text-lg xl:text-xl mb-4 font-bold">
                Member Benefits (always included):
              </p>
              <ul className="space-y-2 text-gray xl:text-lg list-disc list-inside">
                <li>White-glove embed help (real humans, fast setup)</li>
                <li>Automated receipts & reporting</li>
                <li>Educational webinars</li>
                <li>
                  Member Badge in your donation form (stewardship donors can
                  see)
                </li>
                <li>Member Spotlights (monthly stories you can copy)</li>
              </ul>
            </TabPanel>

            <TabPanel className="grid grid-cols-2 @container/panel">
              <p className="text-lg xl:text-xl mb-4 font-bold col-span-full">
                Member Reciprocity (light, but important):
              </p>
              <ul className="@max-2xl/panel:col-span-full space-y-2 text-gray xl:text-lg list-decimal list-inside">
                <li>Show the badge.</li>
                <li>Share one win each year (we'll help write it).</li>
                <li>Invite a peer via your referral link.</li>
              </ul>
              <motion.img
                src={alliance_member_badge}
                width={240}
                className="self-start @2xl/panel:-mt-28 @max-2xl/panel:col-start-1 @max-2xl/panel:col-span-full @max-2xl/panel:w-40 @max-2xl/panel:mt-6 justify-self-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <div className="max-xl:hidden absolute -right-28 isolate -bottom-2">
          <img
            src={laira_yellow}
            width={90}
            className="z-10 max-sm:w-24 rotate-y-180"
          />
          {/** shadow */}
          <svg className="absolute -bottom-3 z-0" width="100%" height="20">
            <defs>
              <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
              </filter>
            </defs>
            <ellipse
              cx="50%"
              cy="50%"
              rx="40"
              ry="6"
              filter="url(#blur)"
              className="fill-gray-l3"
              // className="blur-sm"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
