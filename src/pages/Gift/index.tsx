import { Navigate, Route, Routes } from "react-router-dom";
import Claim from "./Claim";
import Mailer from "./Mailer";
import Purchase from "./Purchase";
import { routes } from "./routes";

export default function Gift() {
  return (
    <div className="grid ">
      <div
        style={{
          backgroundImage: `url("/images/hero.png")`,
        }}
        className="relative overlay w-full h-[23rem] sm:h-[26rem] bg-center bg-cover"
      />
      <Routes>
        <Route
          path={routes.mail}
          element={<Mailer classes="my-8 sm:my-20" />}
        />
        <Route
          path={routes.claim}
          element={<Claim classes="my-8 sm:my-20" />}
        />
        <Route index element={<Purchase classes="my-8 sm:my-20" />} />
        <Route path="*" element={<Navigate to={routes.index} />} />
      </Routes>
    </div>
  );
}
