import QueryLoader from "@ap/components/query-loader";
import { useRegionsQuery } from "@ap/services/countries";
import { setRegions } from "@ap/slices/market-filter";
import { RegionType } from "@ap/slices/market-filter";
import { useGetter, useSetter } from "@ap/store";
import { GroupProps, MultiLevelFilterProps, MultilevelFilter } from "./common";

type Props = Pick<
  MultiLevelFilterProps<string>,
  "label" | "hideBottomBorder"
> & { type: RegionType };

export default function Regions({ type, ...filterProps }: Props) {
  const savedRegion = useGetter((state) => state.marketFilter.region[type]);
  const queryState = useRegionsQuery({});
  const dispatch = useSetter();

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "loading regions..",
        error: "Failed to get regions",
      }}
      classes={{
        container: "px-2 py-4",
      }}
    >
      {(regions) => {
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
      }}
    </QueryLoader>
  );
}
