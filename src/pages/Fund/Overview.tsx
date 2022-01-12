import { unsdgs } from "pages/Fund/unsdgs";

type Props = {
  fund_id: number;
  className: string;
};

export default function Overview({ fund_id, className }: Props) {
  const sdg = unsdgs[fund_id];

  return (
    <article className={className}>
      <h3 className="text-2xl text-white mb-4 font-semibold">{sdg.desc}</h3>
      <p className="text-white-grey pr-4 max-h-96 overflow-y-auto">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vero
        similique sapiente voluptate repellat dolorum doloremque perferendis
        iusto? Amet ea, est repellendus ut quisquam maxime nam voluptatum et
        adipisci sapiente? Iusto harum et nostrum labore consequatur eius
        voluptate nemo quod fuga aspernatur. Nam fuga commodi error
        reprehenderit obcaecati, praesentium eius harum, mollitia soluta aut
        quibusdam esse itaque maxime, dignissimos tempore. Animi facere
        inventore dignissimos numquam tenetur exercitationem earum sit placeat,
        ducimus quidem aliquid maiores ipsa odit consectetur doloremque
        similique quis autem magnam vitae incidunt deserunt accusantium! Dolorem
        consectetur ducimus harum!
      </p>
    </article>
  );
}
