import DAFImg from "assets/images/DAFDirect.png";
import Image from "components/Image";

export default function DAFSample() {
  return (
    <div className="grid place-items-center gap-5">
      <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
        DAFDirect
      </h3>
      <p className="text-center">
        Donation using DAFDirect widget direct to Better Giving.
      </p>
      <Image src={DAFImg} />
    </div>
  );
}
