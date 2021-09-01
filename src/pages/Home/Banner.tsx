import wingImage from "../../assets/images/angelprotocol-wings-wht.png";

export default function Banner() {
  return (
    <div className="grid items-center bg-banner bg-no-repeat w-full bg-cover pt-28 h-150">
      <div className="container mx-auto  grid grid-cols-banner items-center">
        <section style={{ width: "711px" }}>
          <h1 className="text-5xl text-white pl-5">
            Simplified endowments that empower charities to{" "}
            <span className="block font-extrabold text-orange">
              have funding forever
            </span>
          </h1>
        </section>
        <img src={wingImage} alt="" />
      </div>
    </div>
  );
}
