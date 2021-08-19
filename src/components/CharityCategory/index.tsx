import CharityCard from "../CharityCard";
import CategoryCard from "../CategoryCard/CategoryCard";

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
    <section className="grid grid-cols-charity">
      <CategoryCard title={title} description={description} />
      <section className="flex flex-row overflow-x-scroll">
        {cards.map((card) => {
          return <CharityCard {...card} key={card.title} />;
        })}
      </section>
    </section>
  );
};

export default CharityCategory;
