import useDonater from "components/Transactors/Donater/useDonater";
import { app, site } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import useWalletContext from "hooks/useWalletContext";
import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";
import { Profile } from "services/aws/endowments/types";
import CharityLinks from "./CharityLinks";

export default function CharityHeader(props: Profile) {
  const showDonater = useDonater({
    to: "charity",
    receiver: props.endowment_address!,
  });
  const { wallet } = useWalletContext();
  const sdg = unsdgs[+props.un_sdg];
  const isEndowmentOwner = wallet?.address === props.charity_owner;

  return (
    <div className="flex flex-col items-start gap-2">
      {props.un_sdg && (
        <p
          className={`p-3 max-w-250 text-center bg-angel-blue/50 text-white text-sm uppercase font-heading font-bold rounded-xl`}
        >
          SDG #{props.un_sdg}: {sdg?.title}
        </p>
      )}

      <h3 className="text-3xl font-bold text-white uppercase">
        {props.charity_name}
      </h3>

      <div className="flex items-center gap-2 flex-wrap">
        <Button disabled={true} /**disabled until v2 */ onClick={showDonater}>
          DONATE NOW
        </Button>
        {isEndowmentOwner && (
          <LinkButton
            to={`${site.app}/${app.charity_edit}/${props.endowment_address}`}
          >
            EDIT PROFILE
          </LinkButton>
        )}
        <CharityLinks />
      </div>
    </div>
  );
}

const buttonStyle =
  "disabled:bg-grey-accent uppercase bg-orange hover:bg-angel-orange font-heading text-white font-semibold rounded-xl px-6 py-3";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={buttonStyle} />;
}
function LinkButton(props: LinkProps) {
  return <Link {...props} className={buttonStyle} />;
}
