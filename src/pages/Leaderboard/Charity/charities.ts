import animal_ethics from "assets/icons/charities/animal-ethics.gif";
import better_me from "assets/icons/charities/better-me.png";
import boston_scores from "assets/icons/charities/boston-scores.png";
import global_brigades from "assets/icons/charities/global-brigades.png";
import lions_club from "assets/icons/charities/lions-club.png";
// import newlife from "assets/icons/charities/newlife.png";
import pro2tect from "assets/icons/charities/pro2tect.png";
import refugee_girls from "assets/icons/charities/refugee-girls.png";
import rolda from "assets/icons/charities/rolda.png";
import self from "assets/icons/charities/self.png";
import technovation_rwanda from "assets/icons/charities/technovation-rwanda.webp";
import yellow_boat from "assets/icons/charities/yellow-boat.png";
import defaultIcon from "assets/icons/charities/default.png";

import { Charities } from "./types";
import { Addresses } from "./types";

export const defaultURL = "https://angelprotocol.io";
export const defIcon = defaultIcon;

export const charities: Charities = {
  [Addresses.terra12crxq8nxml96e9h38fe67c4p76pc24l54zjzzh]: {
    icon: global_brigades,
    url: "https://www.globalbrigades.org/",
    name: "Global Brigades",
    description:
      "An international development organization alleivating poverty in geographically isolated, resource limted communities around the world",
  },
  [Addresses.terra1uwtk2hs65332emnjn8n9s8d3l692pgyqnew4dq]: {
    icon: self,
    url: " https://www.self.org/",
    name: "Solar Electric Light Fund",
    description:
      "SELF designs and implements solar projects for disadvantaged communities around the world  to advance their levels of healthcare, education, water and food security, and economic development.",
  },
  [Addresses.terra1qagm9wdnp6f76xy52llcjxmr4z8j4nhd9ethw8]: {
    icon: defaultIcon,
    url: defaultURL,
    name: "Npili Geral",
    description: "Empower Guinea girls and help fund future leaders",
  },
  [Addresses.terra13nm3vyj6zfg2tdzsgq97ky6d6gtuty9mu025z3]: {
    icon: rolda,
    url: "https://rolda.org/",
    name: "ROLDA",
    description:
      "ROLDA is an international nonprofit organization that helps the abused, neglected, homeless animals as well as the pet owners from the poorest regions of Romania that struggle to look after their pets responsibly.",
  },
  [Addresses.terra1d5phnyr7e7l44yaathtwrh4f4mv5agajcy508f]: {
    icon: defaultIcon,
    url: defaultURL,
    name: "New Life Church",
    description:
      "A wonderful charity endowment that aims to test all the things",
  },
  [Addresses.terra1tkadaa8phaqnne20rzluhv8p57h23ku4n337ye]: {
    icon: animal_ethics,
    url: defaultIcon,
    name: "Animal Ethics",
    description:
      "Animal Ethics spreads education and supports research to achieve a shift in attitudes towards nonhuman animals. Our vision is a world where sentient beings are given full moral consideration.",
  },
  [Addresses.terra18y4lflmg0wnlkw4hvamp4l2hjv2cafy7dtcyn6]: {
    icon: pro2tect,
    url: " https://pro2tect.live/",
    name: "Pro2Tect",
    description:
      "Pro2tect is saving our oceans through cleanups and trash removal.",
  },
  [Addresses.terra1c5luclcnzwhlf59c5w63yn034z6k9jrefx0swx]: {
    icon: defaultIcon,
    url: defaultURL,
    name: "Blue Jay Animal Sancutary",
    description:
      "A sancutary for animals with disabilities where they can live a full life and are treated with love and compassion.",
  },
  [Addresses.terra1vqe93uv8lylkw4fc8m0xr89fv5xean29ftr0q2]: {
    icon: lions_club,
    url: "https://www.mwlionsclub.org/",
    name: "Lion's Club Manitowish Waters, WI",
    description:
      "Lions serve. It’s that simple, and it has been since we first began in 1917. Our clubs are places where individuals join together to give their valuable time and effort to improving their communities, and the world.",
  },
  [Addresses.terra1k6v33x6sc9chztxgyh859npz740gmn9d4rnfkz]: {
    icon: yellow_boat,
    url: "https://yellowboat.org/",
    name: "Yellow Boat of Hope Foundation",
    description:
      "Improves education for children in the Philippines by partnering with schools, providing transportation to and from school in their signature yellow boats, and increasing local capacity to provide high impact education.",
  },
  [Addresses.terra1xmkprc4p2wxjh9eh58rjf3ndllepnl7xezmuk4]: {
    icon: refugee_girls,
    url: "  https://refugeegirlsneedyou.org/",
    name: "Refugee Girls Need You",
    description:
      "“REFUGEE GIRLS NEED YOU” is an initiative that create connections between teen refugee girls with local Rwandan girls helping refugee to dare having dreams",
  },
  [Addresses.terra1xmeept4tj37qqsajws8r6tl7f5hskvvfg2fmd5]: {
    icon: technovation_rwanda,
    url: "https://technovationrwanda.wixsite.com/",
    name: "Tenchnovation Rwanda",
    description:
      "Technovation Rwanda has been inspiring and educating girls and women to solve real-world problems through technology(Building mobile apps)",
  },
  [Addresses.terra1zn8aqw3ypzvs8pzuadpqw5jw5rptxp4y08z7sr]: {
    icon: better_me,
    url: "https://betterme.org/",
    name: "Better Me",
    description:
      "Better Me is a German not-for-profit, empowering children & youth in Kenya with Good Ideas, Knowledge and Tools to bring about positive change for themselves and their communities.",
  },

  [Addresses.terra1cmp87658s0c475dkyee2p8r9zsdjd628py4zav]: {
    icon: boston_scores,
    url: "https://www.bostonscores.org/",
    name: "Boston Scores",
    description:
      "Boston Scores helps urban youth build essential life skills and character through soccer and team-based enrichment programs.",
  },
  [Addresses.terra1kdd6f099dv4kr5xqp7sxcc7epledxmvyq8xnu3]: {
    icon: defaultIcon,
    url: defaultURL,
    name: "DeFi Ripple Effects (DRE)",
    description:
      "Raises funds to assist Families of Epileptic children gain access to Ketogenic therapies",
  },
};
