import donationFormImgMobile from "assets/images/donation-form-mobile.png";
import donationFormImg from "assets/images/donation-form.png";
import Icon from "components/Icon";
import Image from "components/Image";
import { benefits } from "content/benefits";

export default function DonationFormInfo({ className = "" }) {
  return (
    <section className={`${className} grid @6xl:grid-cols-2 gap-x-16`}>
      <h4 className="mb-4 col-span-full text-lg text-blue-d1 uppercase text-center">
        Your all-in-one donation portal
      </h4>
      <h2 className="mb-16 col-span-full text-center text-4xl">
        Give the way you want, to the causes you care about most
      </h2>
      <Image
        src={donationFormImg}
        className="hidden @lg:block self-center justify-self-center rounded-xl border border-gray-l4 shadow-2xl shadow-black/5"
      />
      <Image
        src={donationFormImgMobile}
        className="@lg:hidden self-center justify-self-center rounded-xl border border-gray-l4 shadow-2xl shadow-black/5"
      />

      <ul className="divide-y divide-gray-l4 mt-6 @6xl:mt-0">
        {benefits.donorsOrder2.map((b, idx) => (
          <ListItem
            title={b.title}
            description={b.description}
            icon={b.listIcon}
            key={idx}
          />
        ))}
      </ul>
    </section>
  );
}

type TListItem = {
  title: string;
  description: string;
  icon?: { src: string; height?: number; width?: number };
};

function ListItem(props: TListItem) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 py-6">
      {props.icon ? (
        <Image
          className="col-start-1 row-span-2 mt-1"
          src={props.icon.src}
          height={props.icon.height}
          width={props.icon.width}
        />
      ) : (
        <Icon
          type="Shapes"
          className="col-start-1 row-span-2 text-gray mt-1 text-lg @6xl:text-xl"
        />
      )}
      <h6 className="text-lg font-medium @6xl:text-xl text-navy-d4">
        {props.title}
      </h6>
      <p className="text-lg @6xl:text-xl text-navy-l3">{props.description}</p>
    </li>
  );
}
