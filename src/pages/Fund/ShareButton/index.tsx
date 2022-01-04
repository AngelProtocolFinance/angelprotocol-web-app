import React, { useState } from "react";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import Button from "../Button";
import "./styles.css";

type IconProps = {
  link: string;
  icon: React.ComponentType<any>;
};

const IconLink = ({ link, icon: Icon }: IconProps) => {
  return (
    <a
      href={link}
      target="_blank"
      className="flex justify-center items-center border-2 border-angel-blue hover:border-blue-accent hover:text-blue-accent rounded-full w-9 h-9"
    >
      <Icon size={20} />
    </a>
  );
};

const ShareSection = ({ isOpen }: any) => (
  <CSSTransition in={isOpen} timeout={300} classNames="share" unmountOnExit>
    <div className="flex gap-2 text-angel-blue h-full">
      <IconLink link="https://twitter.com/angelprotocol" icon={FaTwitter} />
      <IconLink
        link="https://www.linkedin.com/company/angel-protocol"
        icon={FaLinkedinIn}
      />
      <IconLink link="" icon={FaFacebookSquare} />
    </div>
  </CSSTransition>
);

export default function ShareButton() {
  const [isSharing, setSharing] = useState(false);

  const toggleShare = () => setSharing((prev) => !prev);

  return (
    <div className="flex gap-5">
      <Button className="bg-angel-blue" onClick={toggleShare}>
        Share
      </Button>
      <ShareSection isOpen={isSharing} />
    </div>
  );
}
