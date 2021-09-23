import noPovertyIcon from "assets/icons/unsdgs/unsdg-no-poverty.png";
import cleanWaterIcon from "assets/icons/unsdgs/unsdg-clean-water.png";
import energyIcon from "assets/icons/unsdgs/unsdg-affordable-clean-energy.png";
import climateActionIcon from "assets/icons/unsdgs/unsdg-climate-action.png";
import decentWorkIcon from "assets/icons/unsdgs/unsdg-decent-work.png";
import genderIcon from "assets/icons/unsdgs/unsdg-gender-equality.png";
import goodHealthIcon from "assets/icons/unsdgs/unsdg-good-health.png";
import industryIcon from "assets/icons/unsdgs/unsdg-industry.png";
import lifeWaterIcon from "assets/icons/unsdgs/unsdg-life-below-water.png";
import lifeOnLandIcon from "assets/icons/unsdgs/unsdg-life-on-land.png";
import educationIcon from "assets/icons/unsdgs/unsdg-quality-education.png";
import partnershipIcon from "assets/icons/unsdgs/unsdg-partnerships.png";
import responsibleIcon from "assets/icons/unsdgs/unsdg-responsible-consumption.png";
import sustainableIcon from "assets/icons/unsdgs/unsdg-sustainable-communities.png";
import hungerIcon from "assets/icons/unsdgs/unsdg-zero-hunger.png";

export default function UNSDGs() {
  function donateHandler(id: number) {
    return () => alert(`donate to this goal: ${id} __ work in progress`);
  }

  return (
    <div className="pt-24 flex justify-center">
      <ul className="flex flex-col gap-10 w-full max-w-4xl my-10">
        {goals.map(({ id, title, icon, description }) => {
          return (
            <li key={id} className="grid grid-cols-a1">
              <div className="shadow-lg relative w-r32 h-80 bg-gray-300 bg-goal bg-center bg-no-repeat bg-cover rounded-2xl">
                <div className="bg-blue-accent absolute bottom-4 left-4 bg-opacity-90 shadow-xl p-6 rounded-xl w-36 grid place-items-center">
                  <img src={icon} alt="" className="h-16" />
                </div>
              </div>
              <article className="flex flex-col ml-3 p-3">
                <h4 className="grid grid-cols-a1 items-center text-2xl mb-4 font-bold text-thin-blue">
                  <span className="border-4 border-angel-blue w-16 h-16 grid place-items-center rounded-full mr-2">
                    {id}
                  </span>
                  <span>{title}</span>
                </h4>
                <p className="text-angel-grey text-lg">{description}</p>
                <button
                  onClick={donateHandler(id)}
                  className="shadow-md mt-auto self-start bg-thin-blue text-white px-4 py-2 rounded-lg uppercase font-heading font-bold"
                >
                  donate to this index
                </button>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

//hard coded but will dynamically fetch from db in the future
const goals = [
  {
    id: 1,
    title: "No Poverty",
    icon: noPovertyIcon,
    description: "End poverty in all its forms everywhere",
  },
  {
    id: 2,
    title: "Zero Hunger",
    icon: hungerIcon,
    description:
      "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
  },
  {
    id: 3,
    title: "Good health and well-being",
    icon: goodHealthIcon,
    description:
      "Ensure healthy lives and promote well-being for all at all ages.",
  },
  {
    id: 4,
    title: "Quality education",
    icon: educationIcon,
    description:
      "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
  },
  {
    id: 5,
    title: "Gender Equality",
    icon: genderIcon,
    description: "Achieve gender equality and empower all women and girls.",
  },
  {
    id: 6,
    title: "Clean water and sanitation",
    icon: cleanWaterIcon,
    description:
      "Ensure availability and sustainable management of water and sanitation for all.",
  },
  {
    id: 7,
    title: "Afforable clean energy",
    icon: energyIcon,
    description:
      "Ensure access to affordable, reliable, sustainable and modern energy for all.",
  },
  {
    id: 8,
    title: "Decent work and economic growth",
    icon: decentWorkIcon,
    description:
      "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
  },
  {
    id: 9,
    title: "Industry innovation and infrastructure",
    icon: industryIcon,
    description:
      "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
  },
  //   {
  //     id: 10,
  //     title: "Reduced inequalities",
  //     description: 'Reduce inequality within and among countries.
  //   },
  {
    id: 11,
    title: "Sustainable cities and communities",
    icon: sustainableIcon,
    description:
      "Make cities and human settlements inclusive, safe, resilient and sustainable.",
  },
  {
    id: 12,
    title: "Responsible consumption and production",
    icon: responsibleIcon,
    description: "Ensure sustainable consumption and production patterns.",
  },
  {
    id: 13,
    title: "Climate action",
    icon: climateActionIcon,
    description: "Take urgent action to combat climate change and its impacts",
  },
  {
    id: 14,
    title: "Life below water",
    icon: lifeWaterIcon,
    description:
      "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
  },
  {
    id: 15,
    title: "Life on land",
    icon: lifeOnLandIcon,
    description:
      "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
  },
  //   {
  //     id: 16,
  //     title: "Peace, justice and strong institutions",
  //     description: 'Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.'
  //   },
  {
    id: 17,
    title: "Partnerships for the goals",
    icon: partnershipIcon,
    description:
      "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
  },
];
