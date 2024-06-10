import character from "assets/laira/laira-waiving.png";
import Copier from "components/Copier";
import Image from "components/Image";

export default function WpPlugin() {
  return (
    <div
      className={`padded-container mt-16 grid content-start pb-16 @container`}
    >
      <h1 className="text-center @6xl:text-left text-4xl @6xl:text-5xl @6xl:leading-tight text-pretty mb-4 text-navy-d4">
        Better Giving Wordpress plugin documentation
      </h1>
      <div className="py-5">
        <h2 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
          Installing the WordPress Better Giving Donation Form Plugin
        </h2>
        <ol className="list-decimal">
          <li>
            Download the Better Giving{" "}
            <a
              href="https://github.com/AngelProtocolFinance/bg-donation-plugins/releases/download/v0.2/wordpress.zip"
              target="_blank"
              className="text-blue hover:text-blue-l2"
              rel="noreferrer"
            >
              Wordpress Plugin
            </a>{" "}
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
          <li>Activate the Better Giving Donation Form plugin</li>
        </ol>
      </div>
      <div className="py-5">
        <h2 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
          Using and configuring Better Giving Donation Form Shortcode
        </h2>
        <div>
          The shortcode used to insert a Better Giving donation form into your
          wordpress blocks, pages and/or posts is <em>bg_donation_form</em>.
        </div>
        <div className="py-2">
          At a minimum, the following MUST be provided for the shortcode to work
          correctly and render the donation form: a Nonprofit Account ID. This
          is the number that was assigned to your nonprofit when you signed up
          with Better Giving and is unique to it (ex. 121).
        </div>
        <div className="mx-auto flex flex-row max-w-md gap-4 bg-blue-l2 p-4 my-4 rounded">
          <Image
            alt="Laira mascot waving"
            src={character}
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
          Below is an example of the minimum Better Giving donation form
          shortcode that would be needed in order to render a working component
          in Wordpress. With the minimum code, all optional settings will set to
          their defaults.
          <CodeCopy snippet="[bg_donation_form id=121]" />
        </div>
        <div className="py-10">
          The following are additional, optional configuration arguments that
          may be passed to further customize and configure your Donation Form
          settings and appearance from the default:
          <table className="table-fixed border border-gray-l2 mt-5">
            <thead className="border border-gray-l2 bg-blue-l3">
              <tr className="uppercase text-lg">
                <th>Name</th>
                <th>Description</th>
                <th>Allowed Values</th>
                <th>Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="currentsplitpct" />
                </td>
                <td>
                  Set a percentage of a to be split to the current account.
                  Donors can still adjust the split from this starting suggested
                  value. Defaults to 50%.
                </td>
                <td>0-100</td>
                <td>
                  <CodeCopy snippet="currentsplitpct=20" />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="splitdisabled" />
                </td>
                <td>
                  Locks split to current percentage, preventing donors from
                  changing it. This will hide the split slider screen. Defaults
                  to 0.
                </td>
                <td>0 (not disabled) OR 1 (disabled)</td>
                <td>
                  <CodeCopy snippet="splitdisabled=1" />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="showdescription" />
                </td>
                <td>Show or hide the description text. Defaults to shown.</td>
                <td>0 (not shown) OR 1 (shown)</td>
                <td>
                  <CodeCopy snippet="showdescription=0" />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="showtitle" />
                </td>
                <td>Show or hide the title text. Defaults to shown.</td>
                <td>0 (not shown) OR 1 (shown)</td>
                <td>
                  <CodeCopy snippet="showtitle=0" />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="description" />
                </td>
                <td>Custom description text to show under the title.</td>
                <td></td>
                <td>
                  <CodeCopy snippet={`description="Custom description..."`} />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="title" />
                </td>
                <td>
                  Custom title text to show at the top of the donation form.
                </td>
                <td></td>
                <td>
                  <CodeCopy snippet={`title="Custom title"`} />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="methods" />
                </td>
                <td>
                  Define the payment method tabs to show and their order via a
                  comma separated string.
                </td>
                <td>
                  Valid methods: "stocks", "daf", "stripe" (ie. credit cards),
                  "crypto"
                </td>
                <td>
                  <CodeCopy snippet={`methods="crypto,stripe"`} />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="accentprimary" />
                </td>
                <td>
                  Set the primary accent color to your Nonprofit's brand color.
                </td>
                <td>HEX color 3 or 6 digits (must start with '#')</td>
                <td>
                  <CodeCopy snippet={`accentprimary=#dd8943"`} />
                </td>
              </tr>
              <tr className="even:bg-gray-l4 border border-gray-l3">
                <td>
                  <Code snippet="accentsecondary" />
                </td>
                <td>
                  Set the secondary accent color to your Nonprofit's brand
                  color.
                </td>
                <td>HEX color 3 or 6 digits (must start with '#')</td>
                <td>
                  <CodeCopy snippet={`accentsecondary="#dd8943"`} />
                </td>
              </tr>
            </tbody>
          </table>
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
    <span className="flex flex-row gap-2">
      <Code snippet={snippet} />
      <Copier classes={{ icon: "w-4 h-4 hover:text-blue-d1" }} text={snippet} />
    </span>
  );
}
