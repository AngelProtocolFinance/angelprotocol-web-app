import TableSection, { Cells } from "components/TableSection/TableSection";
import { CW3ConfigPayload as CP } from "pages/Admin/Templates/CW3Configurer/cw3ConfigSchema";
import { CW3ConfigUpdateMeta } from "pages/Admin/types";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function CW3ConfigUpdate(props: CW3ConfigUpdateMeta) {
  return (
    <PreviewContainer>
      <table>
        <TableSection type="thead" rowClass="">
          <Cells
            type="th"
            cellClass="text-right p-2 uppercase text-xs font-heading border-r border-white/20"
            dual
          >
            <></>
            <>from</>
            <>to</>
          </Cells>
        </TableSection>
        <TableSection type="tbody" rowClass="border-b border-white/20">
          {(
            Object.entries(props.prevConfig) as Array<[keyof CP, CP[keyof CP]]>
          ).map(([key, prevValue]) => (
            <Cells
              type="td"
              cellClass="text-right p-2 border-r border-white/20"
              dual
              key={key}
              verticalHeaderClass="uppercase text-xs text-left p-2 pl-0 font-heading border-r border-white/20"
            >
              <>{key.replace(/_/g, " ")}</>
              <>{prevValue || "default"}</>
              <>{props.nextConfig[key] || "default"}</>
            </Cells>
          ))}
        </TableSection>
      </table>
    </PreviewContainer>
  );
}
