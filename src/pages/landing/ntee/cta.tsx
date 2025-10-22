import { Image } from "components/image";
import { BOOK_A_DEMO } from "constants/env";
import { Link, href } from "react-router";
import type { PageContext } from "./types";

interface Props extends PageContext {
  classes?: string;
}

export function Cta({ classes = "", ...props }: Props) {
  return (
    <div
      className={`relative bg-gradient-to-br from-blue-d1 to-blue-l2 w-full p-8 rounded-xl shadow-inner ${classes}`}
    >
      <h4 className="text-center  section-heading text-white mb-6">
        {props.cta.pre} Grow Together.
      </h4>
      <h3 className="text-center section-body text-balance text-white mb-9">
        For arts and culture nonprofits building lasting impact-membership in
        the Better Giving Alliance starts free, and grows with you.
      </h3>
      <div className="flex flex-col @xl:flex-row justify-center items-center gap-6 mt-10">
        <Link
          to={href("/register/welcome")}
          className="text-center btn-blue px-6 py-2 xl:px-10 xl:py-4 xl:text-lg shadow-blue/30 hover:shadow-blue/50 active:translate-x-1  font-bold shadow-2xl rounded-xl"
        >
          Start Today - Free
        </Link>
        <Link
          to={BOOK_A_DEMO}
          className="capitalize text-center bg-white  text-blue-d1 active:translate-x-1 font-bold  rounded-xl px-6 py-2 xl:px-8 xl:py-4 xl:text-xl hover:shadow-2xl hover:shadow-white/20"
        >
          Questions? Chat with us
        </Link>
      </div>
      <Image
        src={props.left}
        width={110}
        className="max-md:hidden absolute right-0 md:-right-6 -bottom-12"
      />
      <Image
        src={props.right}
        width={110}
        className="max-md:hidden absolute left-0 md:-left-6 -bottom-12"
      />
    </div>
  );
}
