import { Route, Routes } from "react-router-dom";
import banner from "assets/images/hero.png";
import Purchase from "./Purchase";

export default function Gift() {
  return (
    <div className="grid bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white">
      <div
        style={{
          backgroundImage: `url('${banner}')`,
        }}
        className="relative overlay w-full h-72 bg-center bg-cover"
      />
      <Routes>
        <Route index element={<Purchase classes="" />} />
      </Routes>
    </div>
  );
}
