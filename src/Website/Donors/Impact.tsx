import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "helpers/transitionIn";

export default function Impact() {
  const { isVisible, ref } = useObserve({ threshold: 0.3 });
  return (
    <section ref={ref} className="bg-white grid lg:grid-cols-2">
      <article
        className={`${transitionIn(
          isVisible,
          Direction.fromLeft
        )} p-8 md:p-16 xl:p-24`}
      >
        <h3 className="uppercase text-xl lg:text-2xl xl:text-3xl text-angel-blue font-bold mb-5">
          We extend the impact and lifetime of your gift.
        </h3>
        <p className="my-5 text-angel-grey text-lg xl:text-xl">
          Whether you know which charity to donate to or just want to make an
          impact without the need for researching charities. Angel Protocol is
          here for you.
        </p>
        <ul>
          {list.map(({ id, text }) => (
            <li key={id} className="flex items-center my-4">
              <div className="flex-shrink-0 border-4 border-angel-blue w-5 h-5 lg:w-8 lg:h-8 rounded-full shadow-md grid place-items-center"></div>
              <p className="ml-4 text-angel-grey text-base lg:text-lg max-w-xl">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </article>
      <div className="bg-comet bg-cover bg-center"></div>
    </section>
  );
}

const list = [
  {
    id: 1,
    text: "Curated Charity Indexes aligned to the United Nations Sustainable Development Goals",
  },
  {
    id: 2,
    text: "Donations accepted in $JUNO and scaling to others soon",
  },
  {
    id: 3,
    text: "Coming soon: IRS-compliant crypto donation receipts ",
  },
];
