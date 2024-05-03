import Icon from "components/Icon";
import Image from "components/Image";
import donationFormImgMobile from "./donation-form-mobile.png";
import donationFormImg from "./donation-form.png";

type TListItem = {
  title: string;
  description: string;
};
const items: TListItem[] = [
  {
    title: "Quick, simple setup",
    description:
      "Register in minutes, we’ll review and get you started right away",
  },
  {
    title: "Never miss a donation",
    description:
      "Accept cash, stocks, crypto, and DAF gifts all in one conversion-optimized form",
  },
  {
    title: "Increase funds raised",
    description:
      "Increase funds raised: Choose to have your donations invested to provide sustainable funding",
  },
  {
    title: "Fundraise for free",
    description:
      "Fundraise for free: 100% free. No setup costs, no recurring charges, no platform fees of any kind",
  },
];

export default function DonationFormInfo({ className = "" }) {
  return (
    <section
      className={`${className} grid @6xl:grid-cols-2 gap-x-16 padded-container`}
    >
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        YOUR ALL-IN-ONE DONATION FORM
      </h4>
      <h2 className="mb-16 col-span-full text-center text-4xl">
        Easily accept all types of donations
      </h2>
      <Image
        src={donationFormImg}
        className="hidden @lg:block justify-self-center rounded-xl border border-gray-l4 shadow-2xl shadow-black/5"
      />
      <Image
        src={donationFormImgMobile}
        className="@lg:hidden justify-self-center rounded-xl border border-gray-l4 shadow-2xl shadow-black/5"
      />

      <ul className="divide-y divide-gray-l4 mt-6 @6xl:mt-0">
        {items.map((item, idx) => (
          <ListItem {...item} key={idx} />
        ))}
      </ul>
    </section>
  );
}

function ListItem(props: TListItem) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 py-6">
      <Icon
        type="Shapes"
        className="col-start-1 row-span-2 text-gray mt-1 text-lg @6xl:text-xl"
      />
      <h6 className="font-body text-lg @6xl:text-xl text-navy-l1">
        {props.title}
      </h6>
      <p className="text-lg @6xl:text-xl text-navy-l3">{props.description}</p>
    </li>
  );
}
