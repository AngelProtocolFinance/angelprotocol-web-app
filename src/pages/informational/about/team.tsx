import github from "assets/icons/social/github.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import chauncey from "assets/people/chauncey2.webp";
import justin from "assets/people/justin.webp";
import pallav from "assets/people/pallav.webp";
import shaun from "assets/people/shaun.webp";
import tejaswini from "assets/people/tejaswini.webp";
import tim from "assets/people/tim.webp";
import ExtLink from "components/ext-link";
import { Mail } from "lucide-react";

const members: IMember[] = [
  {
    id: 1,
    name: "Timothy Stirrup",
    title: "Chief Operating Officer",
    socials: {
      linkedin: "https://www.linkedin.com/in/timstirrup",
      email: "mailto:tim@better.giving",
    },
    image: tim,
  },
  {
    id: 2,
    name: "Shaun Robinson",
    title: "Chief Financial Officer",
    socials: {
      linkedin: "https://www.linkedin.com/in/shaun-robinson",
      email: "mailto:shaun@better.giving",
    },
    image: shaun,
  },
  {
    id: 3,
    name: "Pallav Vora",
    title: "Chief Legal Officer",
    socials: {
      linkedin: "https://www.linkedin.com/in/pallav-vora-b74524123",
      email: "mailto:pallav@better.giving",
    },
    image: pallav,
  },
  {
    id: 4,
    name: "Tejaswini Ojha",
    title: "Director of Communications",
    socials: {
      linkedin: "https://www.linkedin.com/in/tejaswini-ojha",
      email: "mailto:tejaswini@better.giving",
    },
    image: tejaswini,
  },
  {
    id: 5,
    name: "Justin Salas",
    title: "Chief Technical Officer",
    socials: {
      github: "https://github.com/ap-justin",
      email: "mailto:justin@better.giving",
    },
    image: justin,
  },
  {
    id: 6,
    name: "Chauncey St. John",
    title: "Executive Director",
    socials: {
      linkedin: "https://www.linkedin.com/in/chauncey-st-john",
      email: "mailto:chauncey@better.giving",
    },
    image: chauncey,
  },
];

export function Team({ classes = "" }) {
  return (
    <div className={`${classes} grid pb-20`}>
      <h2 className="mx-auto text-3xl/tight md:text-4xl/tight lg:text-4.5xl/tight max-md:text-center text-balance mb-16 mt-4 text-blue-d1">
        Backed by a passionate team with deep nonprofit, finance, and tech
        experience
      </h2>
      <div className="grid max-sm:justify-items-center md:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr_auto_1fr] gap-8">
        {members.map((member) => (
          <Member key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
}

interface IMember {
  id: number;
  name: string;
  title: string;
  socials: {
    github?: string;
    email?: string;
    linkedin?: string;
  };
  image: string;
}

function Member(props: IMember) {
  return (
    <div className="grid md:grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 row-span-3 md:grid-rows-subgrid max-md:justify-items-center">
      <img
        width={120}
        className="rounded-full bg-navy object-contain shadow-2xl aspect-square md:row-span-3"
        src={props.image}
      />
      <p className="self-end max-md:mt-2 uppercase font-bold text-navy">
        {props.name}
      </p>
      <p className="text-sm text-navy-l1">{props.title}</p>
      <div className="self-start flex items-center gap-2">
        {props.socials.github && (
          <ExtLink href={props.socials.github} className="text-blue-d1">
            <img width={20} src={github} />
          </ExtLink>
        )}
        {props.socials.linkedin && (
          <a href={props.socials.linkedin} className="text-blue-d1">
            <img width={20} src={linkedin} />
          </a>
        )}{" "}
        {props.socials.email && (
          <ExtLink href={props.socials.email} className="text-blue-d1">
            <Mail size={22} className="stroke-blue-d1" />
          </ExtLink>
        )}
      </div>
    </div>
  );
}
