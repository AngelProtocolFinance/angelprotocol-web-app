import github from "assets/icons/social/github.webp";
import linkedin from "assets/icons/social/linkedin.webp";
import brylle from "assets/people/brylle.webp";
import chauncey from "assets/people/chauncey.webp";
import diane from "assets/people/diane.webp";
import john from "assets/people/john.webp";
import justin from "assets/people/justin.webp";
import pallav from "assets/people/pallav.webp";
import shaun from "assets/people/shaun.webp";
import tim from "assets/people/tim.webp";
import ExtLink from "components/ext-link";
import { Mail } from "lucide-react";
import { useState } from "react";

const members: IMember[] = [
  {
    id: 1,
    name: "Brylle Gutierrez",
    title: "Content and Partnership Manager",
    socials: {
      linkedin: "https://www.linkedin.com/in/timstirrup",
      email: "mailto:tim@better.giving",
    },
    image: brylle,
    bio: [
      "Specializing in content strategy, social media management, digital marketing, and partnership development. His role involves crafting compelling campaigns, managing strategic collaborations, and ensuring consistent and impactful messaging across all platforms.",
      "Before entering the world of outsourcing, Brylle honed his skills as a writer for a broadcasting company, where he developed a strong foundation in storytelling and audience engagement. With his expertise and diverse experience, Brylle brings a strategic approach to managing content and fostering meaningful partnerships.",
    ],
  },
  {
    id: 2,
    name: "Chauncey St. John",
    title: "Executive Director",
    socials: {
      linkedin: "https://www.linkedin.com/in/chauncey-st-john",
      email: "mailto:chauncey@better.giving",
    },
    image: chauncey,
    bio: [
      "Chauncey St. John is the founder and executive director of Better Giving, a platform designed to empower nonprofits with free tools to fundraise, save, and invest. With a mission to simplify financial sustainability, Better Giving has helped over 180 nonprofits globally, raising more than $6 million in donations while reducing administrative burdens.",
      "Previously, Chauncey pioneered a blockchain-based fundraising platform named Angel Protocol that processed crypto donations and evolved into Better Giving’s current one-stop solution. He also founded the Better Giving Alliance, uniting over 125 projects to raise millions for charity through innovative, mission-driven partnerships.",
      "With over a decade of experience leading global operations at GE, Chauncey brings a wealth of expertise in streamlining processes and driving impact through innovation. His work reflects a deep commitment to creating financial self-sufficiency for nonprofits, ensuring they have the tools to thrive in an increasingly complex world.",
    ],
  },
  {
    id: 3,
    name: "Dianne Grace Leopardas",
    title: "Customer Success and Outreach Manager",
    socials: {
      linkedin: "https://www.linkedin.com/in/shaun-robinson",
      email: "mailto:shaun@better.giving",
    },
    image: diane,
    bio: [
      "Dianne is a dedicated Customer Success and Outreach Manager with a passion for building strong client relationships and driving impactful engagement strategies.",
      "With expertise in customer support, team leadership, and outreach initiatives, Dianne ensures clients achieve their goals while fostering long-term partnerships. Focused on delivering exceptional service and innovative solutions, Dianne is committed to customer satisfaction and organizational growth.",
    ],
  },
  {
    id: 4,
    name: "John Mark Velasco",
    title: "Digital Marketing and Media Manager",
    socials: {
      linkedin: "https://www.linkedin.com/in/shaun-robinson",
      email: "mailto:shaun@better.giving",
    },
    image: john,
    bio: [
      "John Mark is a full-stack marketer specializing in digital marketing, content creation, project management, analytics, and web design to help nonprofits grow sustainably and achieve their goals.",
      "A proud dog lover who believes every wagging tail deserves a happy ending and an avid photographer with a passion for capturing moments that tell a story, John combines his skills and passions to make a difference—one campaign, one snapshot, and one cause at a time.",
    ],
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
    bio: [
      "I am passionate about curating and implementing web technologies to turn complex challenges into fast, reliable digital experiences that drive real impact which makes nonprofit organizations' missions more achievable. ",
      "My background as a registered electrical engineer equipped me with the pragmatism to navigate today's vast technology landscape, while my experience as a registered financial planner deepened my understanding of the challenges nonprofits face.",
    ],
  },
  {
    id: 6,
    name: "Pallav Vora",
    title: "Chief Legal Officer",
    socials: {
      linkedin: "https://www.linkedin.com/in/pallav-vora-b74524123",
      email: "mailto:pallav@better.giving",
    },
    image: pallav,
    bio: [
      "Pallav is an experienced in-house attorney with over 12 years of experience working in the nonprofit, impact investing and social enterprise sectors. At Better Giving, he provides strategic legal guidance and governance oversight to support the organization's mission of empowering effective philanthropy.",
    ],
  },
  {
    id: 7,
    name: "Shaun Robinson",
    title: "Chief Financial Officer",
    socials: {
      linkedin: "https://www.linkedin.com/in/shaun-robinson",
      email: "mailto:shaun@better.giving",
    },
    image: shaun,
    bio: [
      "Shaun has been in the nonprofit space for over 10 years. Blending experiences across a range of impact projects from international financing, to implementation, and monitoring and evaluation, Shaun resonates with the challenges many nonprofits face.",
      "His personal interestes in blockchain technology and decentralized finance have intersected nicely with his role at Better Giving as he works to build our own internal resilience, while providing best in class financial pathways to the nonprofits we partner with.",
    ],
  },
  {
    id: 8,
    name: "Timothy Stirrup",
    title: "Chief Operating Officer",
    socials: {
      linkedin: "https://www.linkedin.com/in/timstirrup",
      email: "mailto:tim@better.giving",
    },
    image: tim,
    bio: [
      "Tim trained as a teacher of mathematics and education has run through his veins ever since. As a lifelong learner, he has embraced educational technology – first teaching virtually in 2001, which paid dividends during Covid, AI and Crypto.",
      "He is very much an enthusiast for and a sceptic of all these things. Communication, customer service and marketing are the main areas of his work now - getting things done and making things work – and he loves working with the one aspect that never changes… people!",
    ],
  },
];

export function Team({ classes = "" }) {
  return (
    <div className={`${classes} grid pb-20`}>
      <h2 className="mx-auto text-3xl/tight md:text-4xl/tight lg:text-4.5xl/tight max-md:text-center text-balance mb-16 mt-4 text-blue-d1">
        Backed by a passionate team with deep nonprofit, finance, and tech
        experience
      </h2>
      <div className="grid max-sm:justify-items-center gap-y-16">
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
  bio: string[];
}

function Member({ bio: [tagline, ...more], ...props }: IMember) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="grid md:grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 max-md:justify-items-center">
      <div className="space-y-4 self-start row-span-2 relative">
        <img
          width={200}
          className="-mt-1 rounded-full bg-gray-d1 object-contain shadow-2xl aspect-square md:row-span-3"
          src={props.image}
        />
        <div className="absolute -translate-x-1/2 left-1/2 flex items-center justify-center gap-2">
          {props.socials.github && (
            <ExtLink href={props.socials.github} className="text-blue-d1">
              <img width={21} src={github} />
            </ExtLink>
          )}
          {props.socials.linkedin && (
            <a href={props.socials.linkedin} className="text-blue-d1">
              <img width={20.5} src={linkedin} />
            </a>
          )}{" "}
          {props.socials.email && (
            <ExtLink href={props.socials.email} className="text-blue-d1">
              <Mail size={22} className="stroke-blue-d1" />
            </ExtLink>
          )}
        </div>
      </div>
      <div className="self-end w-full max-md:mt-4">
        <p className="text-blue max-md:mt-2 uppercase font-bold text-lg max-md:text-center">
          {props.name}
        </p>
        <p className="text-lg max-md:text-center">{props.title}</p>
      </div>
      <div className="self-start">
        <p className="mt-2 max-w-3xl text-balance max-md:text-center">
          {tagline}
        </p>
        {more.length > 0 ? (
          <>
            {expanded
              ? more.map((line, i) => (
                  <p
                    key={i}
                    className="mt-2 max-w-3xl text-balance max-md:text-center"
                  >
                    {line}
                  </p>
                ))
              : null}
            <button
              className="text-gray font-heading hover:text-gray-d2 mt-2 block max-md:mx-auto"
              type="button"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read less" : "Read more"}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
