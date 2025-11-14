import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import alliance_member_badge from "assets/images/alliance-member-badge-hexagon.png";
import alliance_member_badge_rect from "assets/images/alliance-member-badge-rectangle.png";
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
        transition={{ type: "spring" }}
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
        <h2 className="text-center section-heading">
          <span className="text-blue">Stewardship</span> means belonging.
        </h2>
        <p className="text-center mb-8 col-span-full text-xl mt-4 max-w-5xl justify-self-center">
          Stewardship isn't a program—it's how we walk together in mission. As a
          nonprofit rooted in faith, Offeria welcomes every registered parish,
          school, diocese, and ministry into a shared community of good
          stewardship—built on trust, transparency, and shared growth.
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
                The Offeria Covenant — your three rights:
              </p>
              <ul className="space-y-2 text-gray xl:text-lg list-disc list-inside">
                <li>
                  <span className="font-bold">Financial Stewardship</span>:
                  access savings and investment options that help your parish
                  grow lasting reserves in accordance with Catholic values.
                </li>
                <li>
                  <span className="font-bold">Fair Access</span>: equal access
                  to modern giving tools—regardless of parish size, budget, or
                  location.
                </li>
                <li>
                  <span className="font-bold">Faithful Autonomy</span>: freedom
                  to direct and manage your funds with transparency and
                  integrity.
                </li>
              </ul>
            </TabPanel>

            <TabPanel className="">
              <p className="text-lg xl:text-xl mb-4 font-bold">
                Member Benefits (always included):
              </p>
              <ul className="space-y-2 text-gray xl:text-lg list-disc list-inside">
                <li>White-glove embed help (real people, fast setup)</li>
                <li>Automated receipts & reporting</li>
                <li>
                  Educational webinars on giving, stewardship, and
                  sustainability
                </li>
                <li>
                  Priority support for parishes and dioceses with special
                  appeals or campaigns
                </li>
                <li>
                  Regular stories and resources you can share with your parish
                  community
                </li>
              </ul>
              <p className="text-gray text-sm mt-4">
                (All available free—funded by optional donor infrastructure
                gifts.)
              </p>
            </TabPanel>

            <TabPanel className="">
              <p className="text-lg xl:text-xl mb-4 font-bold">
                Our shared mission depends on you.
              </p>
              <p className="text-gray xl:text-lg mb-4">
                Because Offeria is a nonprofit serving the Church, we rely on
                our members to help the mission grow. Your part is simple but
                powerful:
              </p>
              <ul className="space-y-2 text-gray xl:text-lg list-disc list-inside">
                <li>
                  Share Offeria with nearby parishes, schools, and dioceses.
                </li>
                <li>
                  Witness to good stewardship—show others what faithful giving
                  can do.
                </li>
                <li>
                  Stay connected through updates and occasional success stories.
                </li>
              </ul>
              <p className="text-gray xl:text-lg mt-4">
                Together we're helping the Church strengthen financial
                stewardship, one parish at a time.
              </p>
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
