import { useRegionsQuery } from "services/countries";
import { QueryLoader } from "components/admin";
import { useGetter, useSetter } from "store/accessors";
import { setRegions } from "slices/components/marketFilter";
import { RegionType } from "slices/components/marketFilter";
import {
  CONTAINER_CLASS,
  GroupProps,
  MultiLevelFilterProps,
  MultilevelFilter,
} from "./common";

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

  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "loading regions..",
        error: "Failed to get regions",
      }}
      classes={{
        container: CONTAINER_CLASS + " items-center grid-cols-[auto_1fr]",
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
