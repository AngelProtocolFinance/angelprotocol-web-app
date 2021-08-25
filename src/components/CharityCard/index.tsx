import { Link } from "react-router-dom";

interface CharityCardProps {
  title: string;
  description: string;
  backgroundImageUrl: string;
}

const CharityCard = ({
  title,
  description,
  backgroundImageUrl,
}: CharityCardProps) => {
  return (
    <article className="w-64 h-48 ml-4 flex-none ">
      <Link to={`/donate/${title}`}>
        <img
          className="rounded-lg img-no-drag"
          src={backgroundImageUrl}
          alt="charity banner"
        />
        <h1 className="font-bold text-base uppercase text-grey-light font-bold mt-1">
          {title}
        </h1>
        <p className="text-xs text-grey-light">{description}</p>
      </Link>
    </article>
  );
};

export default CharityCard;
