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
  const {
    isDown,
    ref,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  } = useClickScroll();

  return (
    <section className="grid grid-cols-charity h-52">
      <CategoryCard title={title} description={description} />
      <section
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`flex flex-row gap-4 ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        } overflow-x-scroll scroll-hidden`}
      >
        {cards.map((card) => {
          return <CharityCard {...card} key={card.id} />;
        })}
      </section>
    </section>
  );
};

export default CharityCategory;
