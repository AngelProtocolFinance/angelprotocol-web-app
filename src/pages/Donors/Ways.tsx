import vaultIcon from "assets/icons/36_network_secure_vault.svg";
import liquidIcon from "assets/icons/08_money_flow.svg";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "helpers/transitionIn";

export default function Ways() {
  const { isVisible, ref } = useObserve({ threshold: 0.5 });
  return (
    <div className="py-24 px-10" ref={ref}>
      <h3
        className={`${transitionIn(
          isVisible,
          Direction.fromTop
        )} max-w-xl mx-auto mb-10 text-2xl lg:text-3xl font-bold text-center text-blue-accent`}
      >
        Donate to a charity aligned to the causes you are passionate about
      </h3>
      <div
        className={`${transitionIn(
          isVisible,
          Direction.fromBottom
        )} flex  flex-col items-center md:flex-row md:justify-center md:items-stretch gap-12`}
      >
        {articles.map((article) => (
          <article
            key={article.id}
            className="w-full max-w-lg shadow-md flex flex-col items-start p-6 border-4 border-blue-accent"
          >
            <h4
              className={`uppercase text-lg lg:text-xl font-bold text-angel-grey my-4`}
            >
              {article.title}
            </h4>
            <p className={`text-angel-grey `}>{article.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const articles = [
  {
    id: 1,
    icon: vaultIcon,
    title: "Find a charity",
    desc: "Our charity marketplace makes it easy for donors to find a charity with highly customizable filters and sorting tools. Find charities around the world that are making an impact.",
  },
  {
    id: 2,
    icon: liquidIcon,
    title: "Select charity index",
    desc: "Our team has curated a list of the most impactful charitable organizations and has grouped them into indexes that are aligned to the United Nations Sustainable Development Goals. Each index includes 10 charities. ",
  },
];
