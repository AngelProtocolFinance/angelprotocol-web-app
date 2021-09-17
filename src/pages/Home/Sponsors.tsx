//supporters icons , is there a way to condense this x_x?
import alice from "assets/icons/sponsors/alice.png";
import apollo from "assets/icons/sponsors/apollo.png";
import astral from "assets/icons/sponsors/astral.png";
import betterra from "assets/icons/sponsors/betterra.png";
import fantasyinvestar from "assets/icons/sponsors/fantasyinvestar.png";
import harpoon from "assets/icons/sponsors/harpoon.png";
import kado from "assets/icons/sponsors/kado.png";
import kash from "assets/icons/sponsors/kash.png";
import loop from "assets/icons/sponsors/loop.png";
import loterra from "assets/icons/sponsors/loterra.png";
import mavolo from "assets/icons/sponsors/mavolo.png";
import orion from "assets/icons/sponsors/orion.png";
import plutospot from "assets/icons/sponsors/plutospot.png";
import pylon from "assets/icons/sponsors/pylon.png";
import smartstake from "assets/icons/sponsors/smartstake.png";
import spaar from "assets/icons/sponsors/spaar.png";
import spar from "assets/icons/sponsors/spar.png";
import starterra from "assets/icons/sponsors/starterra.png";
import talis from "assets/icons/sponsors/talis.png";

export default function Sponsors() {
  return (
    <section className="grid content-start justify-items-center h-auto sm:h-96 bg-light-grey pb-10 sm:pb-0 px-5">
      <h3 className="text-2xl text-angel-grey font-bold my-10">SUPPORTED BY</h3>
      <ul className="flex justify-center flex-wrap gap-3 max-w-3xl">
        {supporterIcons.map((icon, index) => (
          <li key={index}>
            <img src={icon} className="w-16" alt="icon" />
          </li>
        ))}
      </ul>
    </section>
  );
}

const supporterIcons = [
  alice,
  apollo,
  astral,
  betterra,
  fantasyinvestar,
  harpoon,
  kado,
  kash,
  loop,
  loterra,
  mavolo,
  orion,
  plutospot,
  pylon,
  smartstake,
  spaar,
  spar,
  starterra,
  talis,
];
