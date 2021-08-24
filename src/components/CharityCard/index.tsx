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
      <img
        className="rounded-lg img-no-drag"
        src={backgroundImageUrl}
        alt="charity banner"
      />
      <h1 className="font-bold text-base uppercase text-light-grey font-bold mt-1">
        {title}
      </h1>
      <p className="text-xs text-light-grey">{description}</p>
    </article>
  );
};

export default CharityCard;
