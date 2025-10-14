import { blob } from "constants/urls";
import { Link } from "react-router";
interface FormEmbed {
  src: string;
  to: string;
}

const form_embeds: FormEmbed[] = [
  {
    src: blob("form-embed-1.png"),
    to: "https://www.globalbrigades.org/donate/",
  },
  {
    src: blob("form-embed-2.png"),
    to: "https://foodbank.co/#foodbank-donate",
  },
  {
    src: blob("form-embed-3.png"),
    to: "https://www.turtle-foundation.org/spenden/",
  },
];
export function Members({ classes = "" }) {
  return (
    <div className={`${classes} grid content-start py-24`}>
      <h4 className="mb-4 col-span-full text-blue-d1 pre-heading uppercase text-center">
        Members
      </h4>
      <h2 className="col-span-full text-center section-heading mb-16">
        All-In-One Donation Form in Action
      </h2>
      <ul className="grid gap-y-20 gap-x-16 lg:gap-y-0 lg:grid-cols-3 justify-self-center">
        {form_embeds.map((item, idx) => (
          <Link to={item.to} key={idx} target="_blank">
            <img
              width={300}
              className="object-contain"
              src={item.src}
              key={idx}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}
