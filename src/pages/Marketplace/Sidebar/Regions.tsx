import { useRegionsQuery } from "services/countries";
import QueryLoader from "components/QueryLoader";
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
  const queryState = useRegionsQuery({});
  const dispatch = useSetter();

  queryState.isLoading = true;

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
