import React, { PropsWithChildren } from "react";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";

type IconProps = PropsWithChildren<{
  link: string;
  icon: React.ComponentType<any>;
}>;

const IconLink = ({ link, icon: Icon }: IconProps) => {
  return (
    <a
      href={link}
      target="_blank"
      className="flex justify-center items-center border-2 border-angel-blue hover:border-blue-accent hover:text-blue-accent rounded-full w-9 h-9"
    >
      <Icon size={25} />
    </a>
  );
};

export default function ShareSection() {
  return (
    <div className="flex gap-2 text-angel-blue h-full">
      <IconLink link="https://twitter.com/angelprotocol" icon={FaTwitter} />
      <IconLink
        link="https://www.linkedin.com/company/angel-protocol"
        icon={FaLinkedinIn}
      />
      <IconLink link="" icon={FaFacebookSquare} />
    </div>
  );
}
