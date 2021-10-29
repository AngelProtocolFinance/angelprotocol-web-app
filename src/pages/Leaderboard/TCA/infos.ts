import { Names } from "./types";
import defaultIcon from "assets/icons/tca/Angel-Alliance-logo.png";

//validators
// import angel_validator from "assets/icons/tca/validators/Angel@4x.png";
import luna_orbit from "assets/icons/tca/validators/Luna-Orbit@4x.png";
import smartstake from "assets/icons/tca/validators/Smartstake@4x.png";

//nfts
import astronorcs from "assets/icons/tca/nfts/Astronorcs@4x.png";
import fits from "assets/icons/tca/nfts/Fits@4x.png";
import galatic_punks from "assets/icons/tca/nfts/galactic-punks.png";
import hero from "assets/icons/tca/nfts/Hero@4x.png";
import luna_bulls from "assets/icons/tca/nfts/LunaBulls@4x.png";
import millionaire from "assets/icons/tca/nfts/Millionare@4x.png";
import tales_of_terra from "assets/icons/tca/nfts/Talesofterra@4x.png";
import terran from "assets/icons/tca/nfts/Terran@4x.png";
import luna_apes from "assets/icons/tca/nfts/luna_apes.png";

//protocols
import alice from "assets/icons/tca/protocols/alice@4x.png";
import angel from "assets/icons/tca/protocols/Angel@4x.png";
import apollo from "assets/icons/tca/protocols/Apollo@4x.png";
import astral from "assets/icons/tca/protocols/Astral@4x.png";
import bet_terra from "assets/icons/tca/protocols/BetTerra@4x.png";
import crypto11 from "assets/icons/tca/protocols/Crypto11@4x.png";
import edge from "assets/icons/tca/protocols/Edge@4x.png";
import fantasy_investar from "assets/icons/tca/protocols/Fantasy-investar@4x.png";
import kado from "assets/icons/tca/protocols/Kado@4x.png";
import kash from "assets/icons/tca/protocols/Kash@4x.png";
import kinetic_money from "assets/icons/tca/protocols/Kinetic-money@4x.png";
import kujira from "assets/icons/tca/protocols/Kujira@4x.png";
import loop from "assets/icons/tca/protocols/Loop@4x.png";
import loterra from "assets/icons/tca/protocols/Loterra@4x.png";
import mavolo from "assets/icons/tca/protocols/Mavolo@4x.png";
// import minerva from "assets/icons/tca/protocols/minerva@4x.png";
import neptune_finance from "assets/icons/tca/protocols/Neptune-finance@4x.png";
import orion from "assets/icons/tca/protocols/Orion@4x.png";
import plutos_pot from "assets/icons/tca/protocols/Plutos-pot@4x.png";
// import prism from "assets/icons/tca/protocols/prism@4x.png";
import pylon from "assets/icons/tca/protocols/Pylon@4x.png";
import spaar from "assets/icons/tca/protocols/Spaar@4x.png";
import spar from "assets/icons/tca/protocols/Spar@4x.png";
import star_terra from "assets/icons/tca/protocols/StarTerra@4x.png";
import talis from "assets/icons/tca/protocols/Talis@4x.png";
import tsunami from "assets/icons/tca/protocols/Tsunami@4x.png";
import white_whale from "assets/icons/tca/protocols/White-whale@4x.png";
import { MemberInfo } from "./types";

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
  [Names.luna_apes]: { icon: luna_apes, url: " https://apes.city/ ", bgClass:"bg-blue-900" },
};
