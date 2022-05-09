import { lazy, useState } from "react";
import DashLink from "./DashLink";

enum ActiveLink {
  HALO = 0,
  ENDOW = 1,
  LIQUID = 2,
  VALID = 3,
}

const HaloBoard = lazy(() => import("./Halo/HaloBoard"));
const EndowmentBoard = lazy(() => import("./Endowment/EndowmentBoard"));

export default function Dashboard() {
  const [active, setActive] = useState<Partial<ActiveLink>>(ActiveLink.HALO);

  return (
    <div className="padded-container grid grid-rows-aa1 gap-4 pb-4 min-h-screen">
      <nav className="flex flex-row gap-10">
        <DashLink
          setLink={() => setActive(ActiveLink.HALO)}
          active={active === ActiveLink.HALO}
          text="Halo"
        />
        <DashLink
          setLink={() => setActive(ActiveLink.ENDOW)}
          active={active === ActiveLink.ENDOW}
          text="Endowments"
        />
        <DashLink
          setLink={() => setActive(ActiveLink.LIQUID)}
          active={active === ActiveLink.LIQUID}
          text="Liquidity"
        />
        <DashLink
          setLink={() => setActive(ActiveLink.VALID)}
          active={active === ActiveLink.VALID}
          text="Validator"
        />
      </nav>
      {active === ActiveLink.HALO && <HaloBoard />}
      {active === ActiveLink.ENDOW && <EndowmentBoard />}
    </div>
  );
}
