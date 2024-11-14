import type { Card } from "./types";

const StepsCard = (props: Card) => {
  return (
    <div className="grid max-md:justify-items-center md:grid-cols-[auto_1fr] md:grid-rows-[2fr_3fr] md:gap-x-12 md:gap-y-2">
      <img
        src={props.img}
        height={300}
        alt="step card img"
        className="md:row-span-2 size-52 md:size-72 relative rounded-full shadow-lg object-cover object-center max-md:mb-7"
      />

      <h4 className="md:self-end text-navy-d4 text-center md:text-left text-xl md:text-2xl leading-10 max-md:mb-2.5">
        {props.title}
      </h4>
      <p className="md:text-lg text-center md:text-left text-navy-l1 text-balance">
        {props.description}
      </p>
    </div>
  );
};

export default StepsCard;
