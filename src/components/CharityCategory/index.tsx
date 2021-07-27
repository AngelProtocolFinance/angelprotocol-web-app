import CharityCard from "../CharityCard";

interface CharityCategoryProps {
  title: string;
  description: string;
  cards: any[];
}

const CharityCategory = ({
  title,
  description,
  cards,
}: CharityCategoryProps) => {
  return (
    <section className="flex flex-row my-8">
      <div className="w-48 flex-none">
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-base">{description}</p>
      </div>
      <section className="flex flex-row mx-4 overflow-x-scroll">
        {cards.map((card) => {
          return <CharityCard {...card} key={card.title} />;
        })}
      </section>
    </section>
  );
};

export default CharityCategory;
