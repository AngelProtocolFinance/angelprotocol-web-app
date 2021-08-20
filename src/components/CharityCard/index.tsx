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
    <article className="w-64 h-48 ml-4 flex-none">
      <Link to={`/charity/${title}`}>
        <img className="rounded-lg" src={backgroundImageUrl} />
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm">{description}</p>
      </Link>
    </article>
  );
};

export default CharityCard;
