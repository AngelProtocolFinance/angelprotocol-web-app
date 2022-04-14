import liquidIcon from "assets/icons/08_money_flow.svg";
import vaultIcon from "assets/icons/36_network_secure_vault.svg";
import useObserve from "hooks/useObserver";
import transitionIn, { Direction } from "helpers/transitionIn";

export default function Access() {
  const { isVisible, ref } = useObserve({ threshold: 0.15 });
  return (
    <div className="py-24 px-10" ref={ref}>
      <h3
        className={`${transitionIn(
          isVisible,
          Direction.fromFront
        )} uppercase mb-4 text-2xl lg:text-3xl font-bold text-center text-blue-accent`}
      >
        Easy access to donated funds
      </h3>
      <p
        className={`${transitionIn(
          isVisible,
          Direction.fromLeft
        )} text-center text-angel-grey text-lg lg:xl-lg mb-6`}
      >
        Donors choose what percent of their donation goes to your Endowment
        Account versus Liquid Account
      </p>
      <div
        className={`${transitionIn(
          isVisible,
          Direction.fromRight
        )} flex  flex-col items-center md:flex-row md:justify-center md:items-stretch gap-12`}
      >
        {articles.map((article) => (
          <article
            key={article.id}
            className="w-full max-w-lg shadow-md flex flex-col items-center p-6 border-4 border-blue-accent"
          >
            <img className="w-32 h-32" src={article.icon} alt="" />
            <h4 className="uppercase text-lg lg:text-xl text-center font-bold text-angel-grey my-4">
              {article.title}
            </h4>
            <p className="text-angel-grey text-center">{article.desc}</p>
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
    title: "Endowment Account​",
    desc: "Donations made to your endowment are securely locked, ensuring donors that the funds cannot be accessed immediately and instead earn interest over time. ​",
  },
  {
    id: 2,
    icon: liquidIcon,
    title: "Liquid Account",
    desc: "Our team supports your charity on how to create a cryptocurrency wallet. Each month, a percent of the endowment earnings are transferred to your Liquid Account. Charities can then convert these funds to USD and transfer to their charity bank account..",
  },
];
