import { Route, Routes } from "react-router-dom";
import ContactForm from "./Contact";
import Docs from "./Docs";
import { routes } from "./routes";

export default function RegistrationV2() {
  return (
    <section className="grid bg-gray-l5 dark:bg-blue-d4 text-gray-d2 dark:text-white pt-24">
      <Routes>
        <Route path={routes.contact} element={<ContactForm />} />
        <Route path={routes.docs} element={<Docs />} />
        <Route index element={<>hello world</>} />
      </Routes>
    </section>
  );
}
