import CharityCard from "../CharityCard";
import CategoryCard from "../CategoryCard/CategoryCard";
import useClickScroll from "./useClickScroll";

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
  const grabProps = useClickScroll();
  return (
    <section className="grid grid-cols-charity h-52">
      <CategoryCard title={title} description={description} />
      <section
        {...grabProps}
        className="flex flex-row grabbable overflow-x-scroll scroll-hidden "
      >
        {cards.map((card) => {
          return <CharityCard {...card} key={card.title} />;
        })}
      </section>
    </section>
  );
};

export default CharityCategory;
