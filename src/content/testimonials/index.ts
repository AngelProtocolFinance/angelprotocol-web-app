import casd from "./CASD-SL.webp";
import ph from "./PH8_Logo.jpeg";
import ace from "./ace_of_hearts.webp";
import buck from "./buck.webp";
import fora from "./foraday.png";
import shoe from "./shoes_that_speak.webp";
import test from "./testi3Img.png";

export type Testimonial = {
  content: string;
  reviewer: string;
  reviewer_org_role: string;
  reviewer_org_logo: string;
};

export const testimonials: Testimonial[] = [
  {
    content:
      "Better Giving is an incredible idea, platform and opportunity. I have loved working with the team.",
    reviewer: "Faith Flanigan",
    reviewer_org_role: "Buckminster Fuller Institute",
    reviewer_org_logo: buck,
  },
  {
    content:
      "I personally like to check our BG balance weekly. Looking at the endowment growth week by week gives me a little spark of inspiration. The network of BG’s audience seems to be incredibly responsive to crypto’s empowerment. We hope to tap into that.",
    reviewer: "Jenna Edwards",
    reviewer_org_role: "The For a Day Foundation",
    reviewer_org_logo: fora,
  },
  {
    content:
      "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams.",
    reviewer: "Sarah Hornby",
    reviewer_org_role: "YGAP",
    reviewer_org_logo: test,
  },
  {
    content:
      "As pioneers in the realm of leveraging endowments for sustainable giving, our journey with the Better Giving experience has been nothing short of transformative.",
    reviewer: "Joy Onuche",
    reviewer_org_role: "Shoes that Speak Africa",
    reviewer_org_logo: shoe,
  },
  {
    content:
      "The funds we have been granted have saved over 30 dogs. That’s a very large impact. I’m very excited to start the sustainability fund (endowments) as I think this is the future.",
    reviewer: "Kari Whitman",
    reviewer_org_role: "Ace of Hearts Dog Rescue",
    reviewer_org_logo: ace,
  },
  {
    content:
      "The last couple of years have been rough. Better Giving helped us get back on our feet and helped remind me and the team that the work is never done, and helped aligned us back to our overall purpose.",
    reviewer: "Gordon Zhou",
    reviewer_org_role: "PH8 Foundation",
    reviewer_org_logo: ph,
  },
  {
    content:
      "As pioneers in leveraging Better Giving for online fundraising, our experience thus far has been overwhelmingly positive. Better Giving has provided us with a powerful platform to engage donors, expand our reach, and make a tangible impact in the communities we serve in Sierra Leone.",
    reviewer: "Brima Kabbah",
    reviewer_org_role: "Community Action for Sustainable Development",
    reviewer_org_logo: casd,
  },
];
