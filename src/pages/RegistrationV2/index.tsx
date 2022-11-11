import { Route, Routes } from "react-router-dom";
import Resume from "./Resume";
import Signup from "./Signup";
import { routes } from "./routes";

export default function RegistrationV2() {
  return (
    <section className="grid bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white pt-24">
      <Routes>
        <Route
          path={routes.resume}
          element={<Resume classes="justify-self-center" />}
        />
        <Route index element={<Signup classes="justify-self-center" />} />
      </Routes>
    </section>
  );
}
