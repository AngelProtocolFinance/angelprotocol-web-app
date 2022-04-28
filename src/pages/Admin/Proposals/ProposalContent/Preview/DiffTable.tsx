import { DiffSet } from "@types-page/admin";
import TableSection, { Cells } from "components/TableSection/TableSection";
import PreviewContainer from "./preview-components/PreviewContainer";

export default function DiffTable<T extends object>(props: {
  diffSet: DiffSet<T>;
}) {
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
          {props.diffSet.map(([key, prev, next]) => (
            <Cells
              type="td"
              cellClass="text-right p-2 border-r border-white/20"
              dual
              key={key as string} //T is a normal object with string keys
              verticalHeaderClass="uppercase text-xs text-left p-2 pl-0 font-heading border-r border-white/20"
            >
              <>{(key as string).replace(/_/g, " ")}</>
              <>{prev || "not set"}</>
              <>{next || "not set"}</>
            </Cells>
          ))}
        </TableSection>
      </table>
    </PreviewContainer>
  );
}
