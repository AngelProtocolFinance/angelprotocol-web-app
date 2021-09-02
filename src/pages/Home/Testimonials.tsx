import yellowBoatIcon from "assets/images/yellow_boat.png";

export default function Testimonials() {
  return (
    <section className="h-96 grid justify-items-center">
      <h3 className="text-3xl text-blue-accent mt-16 text-center">
        "Angel Protocol is a revolutionary idea for sustainable giving and
        sustainable impact"
      </h3>
      <div className="grid justify-items-center content-start">
        <img className="w-32" src={yellowBoatIcon} alt="" />
        <p className="text-center text-2xl font-semibold mb-2 text-angel-grey">
          Jay Jaboneta
        </p>
        <p className="text-center text-xl text-angel-grey">
          Yellow Boat of Hope Foundation
        </p>
      </div>
    </section>
  );
}
