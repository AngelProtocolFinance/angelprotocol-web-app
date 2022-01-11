import Action from "components/ActionButton/Action";
import React from "react";
import ShareSection from "./ShareSection";

type Props = {
  showShare: boolean;
  onDonate: () => void;
  onShare: () => void;
};

export default function ButtonSection({ showShare, onDonate, onShare }: Props) {
  return (
    <div className="flex justify-center lg:justify-start gap-4 lg:gap-0 lg:flex-col order-3 lg:order-4">
      <Action
        title="Donate"
        classes="bg-orange w-2/5 sm:w-52 h-12"
        onClick={onDonate}
      />
      <div className="flex gap-5">
        <Action
          title="Share"
          classes="bg-angel-blue w-2/5 sm:w-52 h-12"
          onClick={onShare}
        />
        <ShareSection isOpen={showShare} />
      </div>
    </div>
  );
}
