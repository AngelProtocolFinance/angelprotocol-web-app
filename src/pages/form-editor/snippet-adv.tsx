import { Copier } from "components/copier";

type Props = {
  classes?: string;
  form_id: string;
  base_url: string;
};
export function SnippetAdv({ classes = "", form_id, base_url }: Props) {
  const script_url = `<script src="${base_url}/form-embed.js"async></script>`;
  const container_url = `<div data-bg-form="${form_id}"></div>`;

  return (
    <div
      className={`${classes} @container/configurer bg-white rounded p-4 self-start`}
    >
      <p className="text-sm gap-x-1 mb-1">
        Add this script just before{" "}
        <span className="font-mono bg-white text-amber text-xs p-1 rounded-[2px]">
          {"</body>"}
        </span>
      </p>
      <div className="flex p-4 rounded bg-gray-l3 divide-x divide-gray-l2">
        <code className="w-full text-sm text-gray-d1 font-mono break-all block pr-2 whitespace-pre-line">
          {script_url}
        </code>
        <Copier
          classes={{
            icon: "size-5 hover:text-blue-d1",
            container: "ml-2",
          }}
          text={script_url}
        />
      </div>
      <p className="text-sm gap-x-1 mb-1 mt-2">Render the container element</p>
      <div className="flex p-4 rounded bg-gray-l3 divide-x divide-gray-l2">
        <code className="w-full text-sm text-gray-d1 font-mono break-all block pr-2 whitespace-pre-line">
          {container_url}
        </code>
        <Copier
          classes={{
            icon: "size-5 hover:text-blue-d1",
            container: "ml-2",
          }}
          text={container_url}
        />
      </div>
    </div>
  );
}
