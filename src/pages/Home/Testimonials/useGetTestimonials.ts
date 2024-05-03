import casd from "./orgs/CASD-SL.webp";
import ph from "./orgs/PH8_Logo.jpeg";
import ace from "./orgs/ace_of_hearts.webp";
import buck from "./orgs/buck.webp";
import fora from "./orgs/foraday.png";
import shoe from "./orgs/shoes_that_speak.webp";
import test from "./orgs/testi3Img.png";
import type { Testimonial } from "./types";
export default function useGetTestimonials(): Testimonial[] {
  return [
    {
      review:
        "Better Giving is an incredible idea, platform and opportunity.I have loved working with the team",
      reviewer: "Faith Flanagan",
      reviewer_profession: "Buckminster Fuller Institute",
      reviewer_logo: buck,
    },
    {
      review:
        "I personally like to check our BG balance weekly.  Looking at the endowment growth week by week gives me a little spark of inspiration. The network of BG’s audience seems to be incredibly responsive to crypto’s empowerment. We hope to tap into that.",
      reviewer: "Jenna Edward",
      reviewer_profession: "The For a Day Foundation",
      reviewer_logo: fora,
    },
    {
      review:
        "Having an untied, passive income stream from an endowment is highly appealing to complement our other revenue streams",
      reviewer: "Sarah Hornby",
      reviewer_profession: "YGAP",
      reviewer_logo: test,
    },
    {
      review:
        "As pioneers in the realm of leveraging endowments for sustainable giving, our journey with the Better Giving experience has been nothing short of transformative",
      reviewer: "Joy Onuche",
      reviewer_profession: "Shoes that Speak Africa",
      reviewer_logo: shoe,
    },
    {
      review:
        "The funds we have been granted have saved over 30 dogs. That’s a very large impact. I’m very excited to start the sustainability fund (endowments) as I think this is the future ",
      reviewer: "Kari Whitman",
      reviewer_profession: "Ace of Hearts Dog Rescue",
      reviewer_logo: ace,
    },
    {
      review:
        "The last couple of years have been rough.  Better Giving helped us get back on our feet and helped remind me and the team that the work is never done, and helped aligned us back to our overall purpose. ",
      reviewer: "Gordon Zhou",
      reviewer_profession: "PH8 Foundation",
      reviewer_logo: ph,
    },
    {
      review:
        "As pioneers in leveraging Better Giving for online fundraising, our experience thus far has been overwhelmingly positive. Better Giving has provided us with a powerful platform to engage donors, expand our reach, and make a tangible impact in the communities we serve in Sierra Leone.",
      reviewer: "Brima Kabbah",
      reviewer_profession: "Community Action for Sustainable Development",
      reviewer_logo: casd,
    },
  ];
}
