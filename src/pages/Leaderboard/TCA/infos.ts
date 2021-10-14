import { Names } from "./names";
import defaultIcon from "assets/tca/tca.png";

//validators
// import angel_validator from "assets/tca/validators/Angel@4x.png";
import luna_orbit from "assets/tca/validators/Luna-Orbit@4x.png";
import smartstake from "assets/tca/validators/Smartstake@4x.png";

//nfts
import astronorcs from "assets/tca/nfts/Astronorcs@4x.png";
import fits from "assets/tca/nfts/Fits@4x.png";
import galatic_punks from "assets/tca/nfts/galactic-punks.png";
import hero from "assets/tca/nfts/Hero@4x.png";
import luna_bulls from "assets/tca/nfts/LunaBulls@4x.png";
import millionaire from "assets/tca/nfts/Millionare@4x.png";
import tales_of_terra from "assets/tca/nfts/Talesofterra@4x.png";
import terran from "assets/tca/nfts/Terran@4x.png";

//protocols
import alice from "assets/tca/protocols/alice@4x.png";
import angel from "assets/tca/protocols/Angel@4x.png";
import apollo from "assets/tca/protocols/Apollo@4x.png";
import astral from "assets/tca/protocols/Astral@4x.png";
import bet_terra from "assets/tca/protocols/BetTerra@4x.png";
import crypto11 from "assets/tca/protocols/Crypto11@4x.png";
import edge from "assets/tca/protocols/Edge@4x.png";
import fantasy_investar from "assets/tca/protocols/Fantasy-investar@4x.png";
import kado from "assets/tca/protocols/Kado@4x.png";
import kash from "assets/tca/protocols/Kash@4x.png";
import kinetic_money from "assets/tca/protocols/Kinetic-money@4x.png";
import kujira from "assets/tca/protocols/Kujira@4x.png";
import loop from "assets/tca/protocols/Loop@4x.png";
import loterra from "assets/tca/protocols/Loterra@4x.png";
import mavolo from "assets/tca/protocols/Mavolo@4x.png";
// import minerva from "assets/tca/protocols/minerva@4x.png";
import neptune_finance from "assets/tca/protocols/Neptune-finance@4x.png";
import orion from "assets/tca/protocols/Orion@4x.png";
import plutos_pot from "assets/tca/protocols/Plutos-pot@4x.png";
// import prism from "assets/tca/protocols/prism@4x.png";
import pylon from "assets/tca/protocols/Pylon@4x.png";
import spaar from "assets/tca/protocols/Spaar@4x.png";
import spar from "assets/tca/protocols/Spar@4x.png";
import star_terra from "assets/tca/protocols/StarTerra@4x.png";
import talis from "assets/tca/protocols/Talis@4x.png";
import tsunami from "assets/tca/protocols/Tsunami@4x.png";
import white_whale from "assets/tca/protocols/White-whale@4x.png";

type Assets = {
  icon: string;
  url: string;
};

type MemberInfo = {
  [key in Names]: Assets;
};

const defaultUrl = "https://terraalliance.io/";

//prettier-ignore
export const memberInfo: MemberInfo = {
  [Names.apollo]: { icon: apollo, url: "haha" },
  [Names.angel_validator]: { icon: angel, url: "https://angelprotocol.io" },
  [Names.smartstake]: { icon: smartstake, url: "https://smartstake.io/" },
  [Names.luna_orbit]: { icon: luna_orbit, url: "https://lunaorbit.space/" },
  [Names.lo_terra]: { icon: loterra, url: "https://loterra.io/" },
  [Names.loop]: { icon: loop, url: "https://www.loop.markets/" },
  [Names.apollo_dao]: { icon: apollo, url: "https://apollo.farm/" },
  [Names.plutos_pot]: { icon: plutos_pot, url: "https://plutospot.io/" },
  [Names.kujira]: { icon: kujira, url: "https://beta.kujira.app/" },
  [Names.orion]: { icon: orion, url: "https://orion.money/" },
  [Names.bet_terra]: { icon: bet_terra, url: "http://betterra.money/" },
  [Names.crypto11]: { icon: crypto11, url: "https://crypto11.me/" },
  [Names.white_whale]: { icon: white_whale, url: defaultUrl },
  [Names.talis]: { icon: talis, url: "https://talis.art/" },
  [Names.pylon]: { icon: pylon, url: "https://www.pylonprotocol.com/" },
  [Names.kash]: { icon: kash, url: "https://www.kash.io/" },
  [Names.spar]: { icon: spar, url: "https://spar.finance/" },
  [Names.kado]: { icon: kado, url: "https://kado.money/" },
  [Names.fantasy_investar]: { icon: fantasy_investar, url: "" },
  [Names.spaar]: { icon: spaar, url: defaultUrl },
  [Names.mavolo]: { icon: mavolo, url: "http://mavolo.money/" },
  [Names.star_terra]: { icon: star_terra, url: "https://starterra.io/" },
  [Names.astral]: { icon: astral, url: "https://astral.money/" },
  [Names.alice]: { icon: alice, url: "https://www.alice.co/" },
  [Names.tsunami]: { icon: tsunami, url: defaultUrl },
  [Names.kinetic_money]: { icon: kinetic_money, url: defaultUrl },
  [Names.edge]: { icon: edge, url: defaultUrl },
  [Names.neptune]: { icon: neptune_finance, url: defaultUrl },
  [Names.tiik]: { icon: defaultIcon, url: "https://tiiik.money/" },
  [Names.terrans]: { icon: terran, url: defaultUrl },
  [Names.tales_of_terra]: {icon: tales_of_terra, url: "https://talesofterra.art/",},
  [Names.luna_bulls]: { icon: luna_bulls, url: "https://lunabulls.com/" },
  [Names.astronorcs]: { icon: astronorcs, url: defaultUrl },
  [Names.luna_millionaire_portrait]: { icon: millionaire, url: defaultUrl },
  [Names.terra_fits]: { icon: fits, url: defaultUrl },
  [Names.galactic_punks]: { icon: galatic_punks, url: "https://galacticpunks.io/" },
  [Names.luna_lapins]: { icon: defaultIcon, url: defaultUrl },
  [Names.knowhere_art]: { icon: defaultIcon, url: "https://knowhere.art/" },
  [Names.terrapins]: { icon: defaultIcon, url: "https://www.terrapinsonterra.com/" },
  [Names.hero]: { icon: hero, url: defaultUrl },
  [Names.community]: { icon: defaultIcon, url: "https://terraalliance.io/" },
};
