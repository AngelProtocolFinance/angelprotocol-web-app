import { blob } from "constants/urls";

const logo_url = (num: number) => blob(`church-${num}.svg`);

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
      "The endowment platform has transformed how our parish thinks about sustainable giving. Watching our fund grow week by week gives our community confidence in our long-term mission.",
    reviewer: "Fr. Michael Chen",
    org: "St. Joseph Parish",
    org_logo: { w: 60, src: logo_url(3) },
  },
  {
    content:
      "Having a passive income stream from our endowment allows us to focus on ministry rather than constant fundraising. It's been a game-changer for our school's financial stability.",
    reviewer: "Sister Maria Rodriguez",
    org: "Holy Cross Catholic School",
    org_logo: { w: 70, src: logo_url(12) },
  },
  {
    content:
      "As pioneers in leveraging endowments for sustainable ministry funding, our experience has been transformative. The platform makes it easy to engage donors and grow our impact.",
    reviewer: "Deacon James Thompson",
    org: "Sacred Heart Diocese",
    org_logo: { w: 55, src: logo_url(8) },
  },
  {
    content:
      "The transparency and ease of use have made our parish council more confident in our financial planning. We can now think generationally about our ministry.",
    reviewer: "Margaret Sullivan",
    org: "Our Lady of Mercy Parish",
    org_logo: { w: 65, src: logo_url(21) },
  },
  {
    content:
      "This platform has helped us weather difficult times and reminded our team that sustainable funding enables us to stay focused on our mission of serving those in need.",
    reviewer: "David Martinez",
    org: "St. Vincent de Paul Ministry",
    org_logo: { w: 60, src: logo_url(15) },
  },
  {
    content:
      "Our youth ministry programs are now fully funded through endowment distributions. It's incredible to see how a sustainable funding model empowers our mission to the next generation.",
    reviewer: "Emily Watson",
    org: "St. Francis Youth Center",
    org_logo: { w: 50, src: logo_url(27) },
  },
  {
    content:
      "The endowment has provided our diocese with a powerful way to support multiple parishes. The ability to track growth and impact across our entire network has been invaluable.",
    reviewer: "Bishop Robert Hayes",
    org: "Diocese of St. Augustine",
    org_logo: { w: 75, src: logo_url(5) },
  },
];
