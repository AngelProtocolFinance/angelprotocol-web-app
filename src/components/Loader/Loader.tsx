type Props = {
  dimension: string;
};

export default function Loader({ dimension }: Props) {
  return (
    <div className=" flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${dimension} w-${dimension} border-t-4 border-b-4 border-angel-blue`}
      ></div>
    </div>
  );
}
