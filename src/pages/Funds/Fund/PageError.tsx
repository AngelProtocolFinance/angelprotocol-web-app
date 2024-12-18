import { appRoutes } from "constants/routes";
import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageError() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen gap-2 bg-blue dark:bg-blue-d5 text-red-l4 dark:text-red-l2">
      <TriangleAlert size={30} />
      <p className="text-lg text-center">Failed to load nonprofit profile</p>
      <Link
        to={`${appRoutes.marketplace}`}
        className="text-blue-l5 hover:text-blue text-sm"
      >
        Back to Marketplace
      </Link>
    </section>
  );
}
