// import ace from "assets/partners/ace-of-hearts-dog-rescue.jpg";
import buck from "assets/partners/buckminster-fuller.svg";
import casd from "assets/partners/casd-sl.webp";
import fora from "assets/partners/for-a-day-foundation.webp";
// import ph from "assets/partners/ph8.webp";
import shoe from "assets/partners/shoes-that-speak.webp";
import ygap from "assets/partners/ygap.png";

interface ILogo {
  w: number;
  src: string;
  classes?: string;
}
export type Testimonial = {
  content: string;
  reviewer: string;
  org: string | undefined;
  org_logo: ILogo;
};
export const testimonials: Testimonial[] = [
  {
    content:
      "Better Giving is an incredible idea, platform and opportunity. I have loved working with the team.",
    reviewer: "Faith Flanigan",
    org: undefined,
    org_logo: { w: 180, src: buck, classes: "mt-2" },
  },
  {
    content:
      "I personally like to check our BG balance weekly. Looking at the endowment growth week by week gives me a little spark of inspiration. The network of BG's audience seems to be incredibly responsive to crypto's empowerment. We hope to tap into that.",
    reviewer: "Jenna Edwards",
    org: "The For a Day Foundation",
    org_logo: { w: 60, src: fora, classes: "mt-1" },
  },
  {
    content:
      "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams.",
    reviewer: "Sarah Hornby",
    org: undefined,
    org_logo: { w: 60, src: ygap, classes: "-mt-3" },
  },
  {
    content:
      "As pioneers in the realm of leveraging endowments for sustainable giving, our journey with the Better Giving experience has been nothing short of transformative.",
    reviewer: "Joy Onuche",
    org: "Shoes that Speak Africa",
    org_logo: { w: 80, src: shoe },
  },
  {
    content:
      "As pioneers in leveraging Better Giving for online fundraising, our experience thus far has been overwhelmingly positive. Better Giving has provided us with a powerful platform to engage donors, expand our reach, and make a tangible impact in the communities we serve in Sierra Leone.",
    reviewer: "Brima Kabbah",
    org: "Community Action for Sustainable Development",
    org_logo: { w: 60, src: casd },
  },
];
