import ace_of_hearts_dog_rescue from "assets/partners/ace-of-hearts-dog-rescue.jpg";
import biodiversity_group from "assets/partners/biodiversity-group.webp";
import buckminster_fuller from "assets/partners/buckminster-fuller.svg";
import circle_of_care from "assets/partners/circle-of-care.jpg";
import core from "assets/partners/core.png";
import foodbank_bali from "assets/partners/foodbank-bali.svg";
import institute_for_citizens_and_scholars from "assets/partners/institute-for-citizens-and-scholars.svg";
import nine_lives_project from "assets/partners/nine-lives-project.webp";
import plan_for_hope from "assets/partners/plan-for-hope.jpg";
import self from "assets/partners/self.png";
import tutti_cancer_warriors from "assets/partners/tutti-cancer-warriors.png";
import yellow_boat from "assets/partners/yellow-boat.png";

interface IPartner {
  url: string;
  alt: string;
  w: number;
  classes?: string;
}

const brands: IPartner[] = [
  {
    url: biodiversity_group,
    alt: "Biodiversity Group",
    w: 160,
    classes: "max-md:w-32",
  },
  {
    url: institute_for_citizens_and_scholars,
    alt: "Institute for Citizens and Scholars",
    w: 140,
    classes: "max-md:w-32",
  },
  { url: self, alt: "Self", w: 160, classes: "max-md:w-32" },
  { url: plan_for_hope, alt: "Plan for Hope", w: 140, classes: "max-md:w-32" },
  {
    url: buckminster_fuller,
    alt: "Buckminster Fuller",
    w: 200,
    classes: "max-md:w-32",
  },
  {
    url: tutti_cancer_warriors,
    alt: "Tutti Cancer Warriors",
    w: 200,
    classes: "max-md:w-32",
  },
  { url: core, alt: "Core", w: 120, classes: "max-md:w-24" },
  {
    url: circle_of_care,
    alt: "Circle of Care",
    w: 200,
    classes: "max-md:w-32",
  },
  { url: foodbank_bali, alt: "Foodbank Bali", w: 90, classes: "max-md:w-18" },
  { url: yellow_boat, alt: "Yellow Boat", w: 110, classes: "max-md:w-18" },
  {
    url: nine_lives_project,
    alt: "Nine Lives Project",
    w: 90,
    classes: "max-md:w-18",
  },
  {
    url: ace_of_hearts_dog_rescue,
    alt: "Ace of Hearts Dog Rescue",
    classes: "max-md:w-18",
    w: 90,
  },
];

export function Partners({ classes = "" }) {
  return (
    <section className={`${classes} grid content-start mask-b-from-50%`}>
      <h2 className="font-medium text-3xl/tight md:text-3.5xl/tight text-gray-d4 text-center text-balance mb-8">
        Join <span className="font-semibold text-blue">thousands</span> of
        nonprofits, faith charities, schools and universities
      </h2>
      <div className="max-sm:flex justify-center flex-wrap gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center">
        {brands.map((b, idx) => (
          <img
            key={idx}
            src={b.url}
            width={b.w}
            className={`object-contain ${b.classes}`}
            alt="organization logo"
          />
        ))}
      </div>
    </section>
  );
}
