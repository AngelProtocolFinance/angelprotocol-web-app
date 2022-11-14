export type SocialMedia =
  | "Twitter"
  | "Telegram"
  | "Discord"
  | "YouTube"
  | "Medium"
  | "Facebook"
  | "Linkedin"
  | "Instagram";

export type SectionProps = {
  title: string;
  links: {
    text: string;
    href?: string;
  }[];
};
