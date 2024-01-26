import IFrame from "components/IFrame";
import { AWS_S3_PUBLIC_BUCKET } from "constants/env";

export default function DAFDirect() {
  return (
    <div className="grid gap-5">
      <h3 className="text-2xl sm:text-3xl text-center leading-relaxed">
        DAFDirect
      </h3>
      <p className="text-center">
        Donation using DAFDirect widget direct to Better Giving.
      </p>
      <IFrame
        title="DAFDirect Widget"
        src={`${AWS_S3_PUBLIC_BUCKET}/dafdirect-widget.html`}
        // maximum widget dimensions
        // making the value any larger will cause layout issues
        width="180"
        height="300"
        className="justify-self-center"
      />
    </div>
  );
}
