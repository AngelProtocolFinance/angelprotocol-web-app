export default function Details() {
  return (
    <div className="padded-container grid content-start gap-4">
      <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-lg text-white text-opacity-70">
        <div className="flex text-sm">
          <p className="mr-6">ID: 152</p>
          <p>TEXT PROPOSAL</p>
        </div>
        <p className="text-sm mt-4 mb-2">In progress</p>
        <div className="border-b border-b-2 border-opacity-40 pb-2 flex justify-between mb-6">
          <h3 className="text-xl font-bold text-opacity-100">
            Who came first, Egg or Chicken?
          </h3>
          <button className="text-xs font-bold uppercase font-heading px-6 py-1 rounded-md bg-white text-angel-grey">
            Vote
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-10">
          <Item
            title="Creator"
            value="terra1qs7prjncsn2lx4rcxx0xxhyevn8wl68hej6nvy"
          />
          <Item title="Amount" value="10,000 HALO" />
          <Item title="End time" value="block height: 601231813" />
          <Item title="Link" value="https://google.com" />
        </div>
        <div>
          <p className="font-heading font-semibold text-sm mb-2">Description</p>
          <p>
            Eggs come from chickens and chickens come from eggs: that’s the
            basis of this ancient riddle. But eggs – which are just female sex
            cells – evolved more than a billion years ago, whereas chickens have
            been around for just 10,000 years. So the riddle is easily solved…or
            is it? Read more:
            https://www.newscientist.com/question/came-first-chicken-egg/#ixzz7DtaXTYFF
          </p>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 p-6 rounded-md shadow-lg text-white text-opacity-70">
        <h3 className="uppercase text-sm text-opacity-100 font-semibold mb-4">
          Vote details
        </h3>
        <div className="grid grid-cols-3 justify-items-center mb-4">
          <Count title="voted" percent={10} value="Quorum 10%" />
          <Count
            title="yes"
            percent={50}
            value="10 HALO"
            colorClass="text-green-500"
          />
          <Count
            title="no"
            percent={50}
            value="0 HALO"
            colorClass="text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

function Count(props: {
  title: string;
  percent: number;
  value: string;
  colorClass?: string;
}) {
  return (
    <div className="grid place-items-center aspect-square p-8 gap-2 border-2 border-opacity-10 rounded-full">
      <h4 className="text-sm uppercase">{props.title}</h4>
      <p className={`text-3xl font-bold ${props.colorClass}`}>
        {props.percent} %
      </p>
      <p className="text-sm">{props.value}</p>
    </div>
  );
}

function Item(props: { title: string; value: string }) {
  return (
    <div className="text-opacity-100">
      <h4 className="text-sm font-semibold mb-1">{props.title}</h4>
      <p>{props.value}</p>
    </div>
  );
}
