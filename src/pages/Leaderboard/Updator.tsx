type Props = {
  lastUpdate: string;
  isLoading: boolean;
  refresh: () => void;
};

export default function Updator({ lastUpdate, isLoading, refresh }: Props) {
  return (
    <div className="flex absolute top-3 right-6 gap-2 text-sm font-body">
      <p className="text-angel-grey">
        last update: {new Date(lastUpdate).toLocaleTimeString()}
      </p>
      <button
        className="uppercase text-xs bg-angel-blue disabled:bg-thin-grey px-2 text-white rounded-sm font-semibold"
        disabled={isLoading}
        onClick={refresh}
      >
        update
      </button>
    </div>
  );
}
