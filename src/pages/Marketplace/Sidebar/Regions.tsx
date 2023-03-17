import regions from "assets/countries/regions.json";
import { useGetter, useSetter } from "store/accessors";
import { setRegions } from "slices/components/marketFilter";
import { RegionType } from "slices/components/marketFilter";
import { GroupProps, MultiLevelFilterProps, MultilevelFilter } from "./common";

type Props = Pick<
  MultiLevelFilterProps<string>,
  "label" | "hideBottomBorder"
> & { type: RegionType };

export default function Regions({ type, ...filterProps }: Props) {
  const savedRegion = useGetter(
    (state) => state.component.marketFilter.region[type]
  );

  const dispatch = useSetter();

  return (
    <MultilevelFilter
      {...filterProps}
      groups={Object.entries(regions).map<GroupProps<string>>(
        ([region, countries]) => ({
          key: region,
          label: region,
          selectedValues: savedRegion[region] || [],
          options: countries.map((c) => ({
            displayText: c,
            value: c,
            key: c,
          })),
          onChange(options) {
            dispatch(
              setRegions({
                type,
                value: { region, countries: options },
              })
            );
          },
        })
      )}
    />
  );
}
