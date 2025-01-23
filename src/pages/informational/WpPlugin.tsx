import { laira } from "assets/laira/laira";
import Copier from "components/Copier";
import ExtLink from "components/ExtLink";
import Image from "components/Image";
import TableSection, { Cells } from "components/TableSection";
import { APP_NAME } from "constants/env";

export default function WpPlugin() {
  return (
    <div className="padded-container mt-16 content-start pb-16 @container">
      <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
        {APP_NAME} Wordpress plugin documentation
      </h1>
      <div className="py-5">
        <h2 className="mb-4 text-lg text-blue-d1 uppercase text-center">
          Installing the WordPress {APP_NAME} Donation Form Plugin
        </h2>
        <ol className="list-decimal">
          <li>
            Download the {APP_NAME}{" "}
            <ExtLink
              href="https://github.com/AngelProtocolFinance/bg-donation-plugins/releases/download/v0.2/wordpress.zip"
              className="text-blue hover:text-blue-l2"
            >
              Wordpress Plugin
            </ExtLink>{" "}
            (ZIP file).
            <p className="text-gray">
              SHA256 Checksum:
              34f1aa11ab99e691e290b128d11d019cc9f7cb29f14f01f921b03835316880ce
            </p>
          </li>
          <li>
            Install the plugin by uploading the ZIP file to your Wordpress
            server, via the WP-Admin interface.
          </li>
          <li>Activate the {APP_NAME} Donation Form plugin</li>
        </ol>
      </div>
      <div className="py-5">
        <h2 className="mb-4 text-lg text-blue-d1 uppercase text-center">
          Using and configuring {APP_NAME} Donation Form Shortcode
        </h2>
        <div>
          The shortcode used to insert a {APP_NAME} donation form into your
          wordpress blocks, pages and/or posts is <em>bg_donation_form</em>.
        </div>
        <div className="py-2">
          At a minimum, the following MUST be provided for the shortcode to work
          correctly and render the donation form: a Nonprofit Account ID. This
          is the number that was assigned to your nonprofit when you signed up
          with {APP_NAME} and is unique to it (ex. 121).
        </div>
        <div className="mx-auto flex max-w-md gap-4 bg-blue-l2 p-4 my-4 rounded">
          <Image
            alt="Laira mascot waving"
            src={laira.waiving}
            className="max-sm:place-self-center"
            width={30}
          />
          <span>
            <strong>NOTE:</strong> If you do not know your Nonprofit Account
            number, you can easily locate by navigating to the Marketplace and
            searching for your nonprofit by name. The account number is found at
            the end of the link to your profile on it's marketplace card (ex:
            https://better.giving/marketplace/121).
          </span>
        </div>
        <div className="py-5">
          Below is an example of the minimum {APP_NAME} donation form shortcode
          that would be needed in order to render a working component in
          Wordpress. With the minimum code, all optional settings will set to
          their defaults.
          <CodeCopy snippet="[bg_donation_form id=121]" />
        </div>
        <div className="py-10">
          The following are additional, optional configuration arguments that
          may be passed to further customize and configure your Donation Form
          settings and appearance from the default:
          <div className="overflow-x-auto">
            <table className="w-full text-sm rounded border border-separate border-spacing-0 border-blue-l2">
              <TableSection
                type="thead"
                rowClass="bg-blue-l4 divide-x divide-blue-l2"
              >
                <Cells
                  type="th"
                  cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
                >
                  <>Name</>
                  <>Description</>
                  <>Allowed Values</>
                  <>Example</>
                </Cells>
              </TableSection>
              <TableSection
                type="tbody"
                rowClass="even:bg-blue-l5 divide-x divide-blue-l2"
                selectedClass="bg-blue-l4 dark:bg-blue-d4"
              >
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="currentsplitpct" />
                  <>
                    Set a percentage of a to be split to the current account.
                    Donors can still adjust the split from this starting
                    suggested value. Defaults to 50%.
                  </>
                  <>0-100</>
                  <CodeCopy snippet="currentsplitpct=20" />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate first:rounded-bl last:rounded-br"
                >
                  <Code snippet="splitdisabled" />
                  <>
                    Locks split to current percentage, preventing donors from
                    changing it. This will hide the split slider screen.
                    Defaults to 0.
                  </>
                  <>0 (not disabled) OR 1 (disabled)</>
                  <CodeCopy snippet="splitdisabled=1" />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="showdescription" />
                  <>Show or hide the description text. Defaults to shown.</>
                  <>0 (not shown) OR 1 (shown)</>
                  <CodeCopy snippet="showdescription=0" />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="showtitle" />
                  <>Show or hide the title text. Defaults to shown.</>
                  <>0 (not shown) OR 1 (shown)</>
                  <CodeCopy snippet="showtitle=0" />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="description" />
                  <>Custom description text to show under the title.</>
                  <></>
                  <CodeCopy snippet={`description="Custom description..."`} />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="title" />
                  <>
                    Custom title text to show at the top of the donation form.
                  </>
                  <></>
                  <CodeCopy snippet={`title="Custom title"`} />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="methods" />
                  <>
                    Define the payment method tabs to show and their order via a
                    comma separated string.
                  </>
                  <>
                    Valid methods: "stocks", "daf", "stripe" (ie. credit cards),
                    "crypto"
                  </>
                  <CodeCopy snippet={`methods="crypto,stripe"`} />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="accentprimary" />
                  <>
                    Set the primary accent color to your Nonprofit's brand
                    color.
                  </>
                  <>HEX color 3 or 6 digits (must start with '#')</>
                  <CodeCopy snippet={`accentprimary=#dd8943"`} />
                </Cells>
                <Cells
                  type="td"
                  cellClass="p-3 border-t border-blue-l2 max-w-[256px] truncate"
                >
                  <Code snippet="accentsecondary" />
                  <>
                    Set the secondary accent color to your Nonprofit's brand
                    color.
                  </>
                  <>HEX color 3 or 6 digits (must start with '#')</>
                  <CodeCopy snippet={`accentsecondary="#dd8943"`} />
                </Cells>
              </TableSection>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  snippet: string;
};

function Code({ snippet = "" }: Props) {
  return <div className="text-sm sm:text-base font-mono py-4">{snippet}</div>;
}

function CodeCopy({ snippet = "" }: Props) {
  return (
    <span className="flex gap-2">
      <Code snippet={snippet} />
      <Copier classes={{ icon: "w-4 h-4 hover:text-blue-d1" }} text={snippet} />
    </span>
  );
}
