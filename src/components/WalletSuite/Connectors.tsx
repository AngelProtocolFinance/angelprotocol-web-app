import TerraExt from "components/TerraStation/Extension";
import TerraMobile from "components/TerraStation/Mobile";

export default function Connectors() {
  return (
    <div className="flex gap-4 bg-white bg-opacity-5 p-4">
      <TerraExt />
      <TerraMobile />
    </div>
  );
}
