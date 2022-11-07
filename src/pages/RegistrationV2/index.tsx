import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";

export default function RegistrationV2() {
  return (
    <section className="bg-gray-l5 text-gray-d2 pt-24">
      <Routes>
        <Route index element={<Signup />} />
      </Routes>
    </section>
  );
}
