import { Route, Routes } from "react-router-dom";
import Docs from "../Registration/Steps/Documentation/Form";
import { routes } from "./routes";

export default function RegistrationV2() {
  return (
    <section className="grid bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white pt-24">
      <Routes>
        <Route index element={<>hello world</>} />
      </Routes>
    </section>
  );
}
