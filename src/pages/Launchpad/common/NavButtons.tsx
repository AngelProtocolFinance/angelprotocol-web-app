import { Link } from "react-router-dom";
import { Progress } from "slices/launchpad/types";

type Props = { classes?: string; curr: Exclude<Progress, 0 | 1> };
export default function NavButtons({ classes = "", curr }: Props) {
  const prev = curr === 2 ? "../." : `../${curr - 1}`;

  return (
    <div className={`grid grid-cols-2 sm:flex gap-2 ${classes}`}>
      <Link to={prev} className="text-sm px-8 btn-outline-filled">
        Back
      </Link>

      <button type="submit" className="text-sm px-8 btn-orange">
        Continue
      </button>
    </div>
  );
}
