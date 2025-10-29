import hexagon_badge from "assets/images/alliance-member-badge-hexagon.png";
import rectangle_badge from "assets/images/alliance-member-badge-rectangle.png";
import { ArrowDownToLineIcon } from "lucide-react";

export default function Page() {
  const handle_download = (image_url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = image_url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="@container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alliance Member Badges</h1>
      <div className="grid justify-start grid-cols-1 @lg:grid-cols-[auto_auto] grid-rows-[1fr_auto] gap-8">
        <div className="grid grid-rows-subgrid gap-y-2 row-span-2 justify-items-center">
          <img
            className="self-center"
            width={190}
            src={hexagon_badge}
            alt="Alliance Member Badge"
          />
          <button
            className="flex text-sm items-center mt-2"
            type="button"
            onClick={() =>
              handle_download(
                hexagon_badge,
                "alliance-member-badge-hexagon.png"
              )
            }
          >
            <ArrowDownToLineIcon size={14} />
            Download
          </button>
        </div>

        <div className="grid grid-rows-subgrid gap-y-2 row-span-2 justify-items-center">
          <img
            className="self-center"
            width={200}
            src={rectangle_badge}
            alt="Alliance Member Badge"
          />
          <button
            className="flex text-sm items-center mt-2"
            type="button"
            onClick={() =>
              handle_download(
                rectangle_badge,
                "alliance-member-badge-rectangle.png"
              )
            }
          >
            <ArrowDownToLineIcon size={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
