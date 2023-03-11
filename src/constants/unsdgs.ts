import { UNSDG_NUMS } from "types/lists";
import clean_water from "assets/icons/unsdg/clean_water.png";
import climate from "assets/icons/unsdg/climate.png";
import consumption from "assets/icons/unsdg/consumption.png";
import decent_work from "assets/icons/unsdg/decent_work.png";
import education from "assets/icons/unsdg/education.png";
import energy from "assets/icons/unsdg/energy.png";
import gender_equality from "assets/icons/unsdg/gender_equality.png";
import good_health from "assets/icons/unsdg/good_health.png";
import industry from "assets/icons/unsdg/industry.png";
import inequalities from "assets/icons/unsdg/inequalities.png";
import justice from "assets/icons/unsdg/justice.png";
import life_land from "assets/icons/unsdg/life_land.png";
import life_water from "assets/icons/unsdg/life_water.png";
import no_poverty from "assets/icons/unsdg/no_poverty.png";
import partnership from "assets/icons/unsdg/partnership.png";
import sustainable from "assets/icons/unsdg/sustainable_communities.png";
import zero_hunger from "assets/icons/unsdg/zero_hunger.png";

type S = string;

type UNSDG = {
  text_light: S;
  text_dark: S;
  text_hover: S;
  bg: S;
  border: S;
  icon: S;
  title: S;
  desc: S;
  youtube: S;
  website: S;
};

export const unsdgs: { [index in UNSDG_NUMS]: UNSDG } = {
  1: {
    text_light: "text-white",
    text_dark: "text-sdg1",
    text_hover: "hover:text-sdg1",
    bg: "bg-sdg1",
    border: "border-sdg1",
    icon: no_poverty,
    title: "No Poverty",
    desc: "End poverty in all its forms everywhere.",
    youtube: "https://www.youtube.com/watch?v=kNsLF9-9l5U",
    website: "https://sdgs.un.org/goals/goal1",
  },
  2: {
    text_light: "text-white",
    text_dark: "text-sdg2",
    text_hover: "hover:text-sdg2",
    bg: "bg-sdg2",
    border: "border-sdg2",
    icon: zero_hunger,
    title: "Zero Hunger",
    desc: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    youtube: "https://www.youtube.com/watch?v=j06rYbyD9lI",
    website: "https://sdgs.un.org/goals/goal2",
  },
  3: {
    text_light: "text-white",
    text_dark: "text-sdg3",
    text_hover: "hover:text-sdg3",
    bg: "bg-sdg3",
    border: "border-sdg3",
    icon: good_health,
    title: "Good Health",
    desc: "Ensure healthy lives and promote well-being for all at all ages.",
    youtube: "https://www.youtube.com/watch?v=Fzz3Rr8fd2Q",
    website: "https://sdgs.un.org/goals/goal3",
  },
  4: {
    title: "Quality Education",
    desc: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    text_light: "text-white",
    text_dark: "text-sdg4",
    text_hover: "hover:text-sdg4",
    bg: "bg-sdg4",
    border: "border-sdg4",
    icon: education,
    youtube: "https://www.youtube.com/watch?v=dKip3rpuEvY",
    website: "https://sdgs.un.org/goals/goal4",
  },
  5: {
    title: "Gender Equality",
    desc: "Achieve gender equality and empower all women and girls.",
    text_light: "text-white",
    text_dark: "text-sdg5",
    text_hover: "hover:text-sdg5",
    bg: "bg-sdg5",
    border: "border-sdg5",
    icon: gender_equality,
    youtube: "https://www.youtube.com/watch?v=MsbAETRE7b4",
    website: "https://sdgs.un.org/goals/goal5",
  },
  6: {
    title: "Clean Water",
    desc: "Ensure availability and sustainable management of water and sanitation for all.",
    text_light: "text-white",
    text_dark: "text-sdg6",
    text_hover: "hover:text-sdg6",
    bg: "bg-sdg6",
    border: "border-sdg6",
    icon: clean_water,
    youtube: "https://www.youtube.com/watch?v=LCKsU4bPFOQ",
    website: "https://sdgs.un.org/goals/goal6",
  },
  7: {
    title: "Affordable and Clean Energy",
    desc: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    text_light: "text-white",
    text_dark: "text-sdg7",
    text_hover: "hover:text-sdg7",
    bg: "bg-sdg7",
    border: "border-sdg7",
    icon: energy,
    youtube: "https://www.youtube.com/watch?v=AA9X39tFkgU",
    website: "https://sdgs.un.org/goals/goal7",
  },
  8: {
    title: "Decent Work and Economic Growth",
    desc: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    text_light: "text-white",
    text_dark: "text-sdg8",
    text_hover: "hover:text-sdg8",
    bg: "bg-sdg8",
    border: "border-sdg8",
    icon: decent_work,
    youtube: "https://www.youtube.com/watch?v=E231k5qH-ac",
    website: "https://sdgs.un.org/goals/goal8",
  },
  9: {
    title: "Industry, Innovation and Infrastructure",
    desc: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    text_light: "text-white",
    text_dark: "text-sdg9",
    text_hover: "hover:text-sdg9",
    bg: "bg-sdg9",
    border: "border-sdg9",
    icon: industry,
    youtube: "https://www.youtube.com/watch?v=wCfNiGLTg-I",
    website: "https://sdgs.un.org/goals/goal9",
  },
  10: {
    title: "Reduced Inequalities",
    desc: "Reduce inequality within and among countries.",
    text_light: "text-white",
    text_dark: "text-sdg10",
    text_hover: "hover:text-sdg10",
    bg: "bg-sdg10",
    border: "border-sdg10",
    icon: inequalities,
    youtube: "https://www.youtube.com/watch?v=P-xWg3WZUHw",
    website: "https://sdgs.un.org/goals/goal10",
  },
  11: {
    title: "Sustainable Cities and Communities",
    desc: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    text_light: "text-white",
    text_dark: "text-sdg11",
    text_hover: "hover:text-sdg11",
    bg: "bg-sdg11",
    border: "border-sdg11",
    icon: sustainable,
    youtube: "https://www.youtube.com/watch?v=RPoDircL5zc",
    website: "https://sdgs.un.org/goals/goal11",
  },
  12: {
    title: "Responsible Consumption and Production",
    desc: "Ensure sustainable consumption and production patterns.",
    text_light: "text-white",
    text_dark: "text-sdg12",
    text_hover: "hover:text-sdg12",
    bg: "bg-sdg12",
    border: "border-sdg12",
    icon: consumption,
    youtube: "https://www.youtube.com/watch?v=RX2elsVjY-c",
    website: "https://sdgs.un.org/goals/goal12",
  },
  13: {
    title: "Climate Action",
    desc: "Take urgent action to combat climate change and its impacts.",
    text_light: "text-white",
    text_dark: "text-sdg13",
    text_hover: "hover:text-sdg13",
    bg: "bg-sdg13",
    border: "border-sdg13",
    icon: climate,
    youtube: "https://www.youtube.com/watch?v=oSqmCNNV2dQ",
    website: "https://sdgs.un.org/goals/goal13",
  },
  14: {
    title: "Life Below Water",
    desc: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    text_light: "text-white",
    text_dark: "text-sdg14",
    text_hover: "hover:text-sdg14",
    bg: "bg-sdg14",
    border: "border-sdg14",
    icon: life_water,
    youtube: "https://www.youtube.com/watch?v=N3nnyj998BI",
    website: "https://sdgs.un.org/goals/goal14",
  },
  15: {
    title: "Life On Land",
    desc: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    text_light: "text-white",
    text_dark: "text-sdg15",
    text_hover: "hover:text-sdg15",
    bg: "bg-sdg15",
    border: "border-sdg15",
    icon: life_land,
    youtube: "https://www.youtube.com/watch?v=N5YR2GMhYcI",
    website: "https://sdgs.un.org/goals/goal15",
  },
  16: {
    title: "Peace Justice and Strong Institutions",
    desc: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    text_light: "text-white",
    text_dark: "text-sdg16",
    text_hover: "hover:text-sdg16",
    bg: "bg-sdg16",
    border: "border-sdg16",
    icon: justice,
    youtube: "https://www.youtube.com/watch?v=Ww_B0mvGiYc",
    website: "https://sdgs.un.org/goals/goal16",
  },
  17: {
    title: "Partnerships for the Goals",
    desc: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
    text_light: "text-white",
    text_dark: "text-sdg",
    text_hover: "hover:text-sdg17",
    bg: "bg-sdg17",
    border: "border-sdg17",
    icon: partnership,
    youtube: "https://www.youtube.com/watch?v=iNybt97dnQ0",
    website: "https://sdgs.un.org/goals/goal17",
  },
};

export const MAX_SDGS = 8;
