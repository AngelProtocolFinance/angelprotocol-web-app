import { Tab, TabGroup, TabList, TabPanel } from "@headlessui/react";
import { Copier } from "components/copier";

type Props = {
  classes?: string;
  form_id: string;
  base_url: string;
};
export function SnippetAdv({ classes = "", form_id, base_url }: Props) {
  /** allow payment https://docs.stripe.com/payments/payment-methods/pmd-registration?dashboard-or-api=dashboard#using-an-iframe */
  const iframe_url = `<iframe src="${base_url}/forms/${form_id}" width="700" height="900" style="border:0px"></iframe>`;
  const script_url = `<script src="${base_url}/form-embed.js"async></script>`;
  const container_url = `<div data-bg-form="${form_id}"></div>`;

  return (
    <TabGroup defaultIndex={1} className={`${classes} relative`}>
      <TabList className="flex items-center mb-2 border-y border-gray-l2">
        <Tab className="data-[selected]:bg-white data-[selected]:shadow-inner px-3 py-1 text-gray-d1 hover:text-gray-d4 data-[selected]:text-gray-d4 rounded-[2px] focus:outline-none text-sm">
          Simple
        </Tab>
        <Tab className="data-[selected]:bg-white px-3 py-1 text-gray-d1 hover:text-gray-d4 data-[selected]:text-gray-d4 rounded-[2px] focus:outline-none text-sm">
          Advanced
        </Tab>
      </TabList>
      <TabPanel>
        <p className="text-sm gap-x-1 mb-1">
          Copy snippet below and paste into your website
        </p>
        <div className="flex p-4 rounded bg-gray-l3 divide-x divide-gray-l2">
          <code className="w-full text-sm text-gray-d1 font-mono break-all block pr-2 whitespace-pre-line">
            {iframe_url}
          </code>
          <Copier
            classes={{
              icon: "size-5 hover:text-blue-d1",
              container: "ml-2",
            }}
            text={iframe_url}
          />
        </div>
      </TabPanel>
      <TabPanel>
        <p className="text-sm gap-x-1 mb-1">
          Add this script just before{" "}
          <span className="font-mono bg-white text-amber text-xs p-1 rounded-[2px]">
            {"</body>"}
          </span>
        </p>
        <div className="flex p-4 rounded bg-gray-l3 divide-x divide-gray-l2">
          <code className="w-full text-sm text-gray-d1 font-mono break-all block pr-2 whitespace-pre-line">
            {script_url}
          </code>
          <Copier
            classes={{
              icon: "size-5 hover:text-blue-d1",
              container: "ml-2",
            }}
            text={script_url}
          />
        </div>
        <p className="text-sm gap-x-1 mb-1 mt-2">
          Render the container element
        </p>
        <div className="flex p-4 rounded bg-gray-l3 divide-x divide-gray-l2">
          <code className="w-full text-sm text-gray-d1 font-mono break-all block pr-2 whitespace-pre-line">
            {container_url}
          </code>
          <Copier
            classes={{
              icon: "size-5 hover:text-blue-d1",
              container: "ml-2",
            }}
            text={container_url}
          />
        </div>
      </TabPanel>
    </TabGroup>
  );
}
