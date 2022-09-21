import * as Yup from "yup";
import { Allocation, StrategyFormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { FIELD_PRECISION } from "./Fields/VaultField";

type AllocationSchema = (allocations: Allocation[]) => SchemaShape<Allocation>;
const allocation: AllocationSchema = (allocations) => ({
  percentage: Yup.number()
    //pct must be greater than 0.009 or be rounded down to 0
    .min(9 * Math.pow(10, -FIELD_PRECISION - 1), "invalid percentage")
    .max(100, "can't be more than 100%")
    .test("total doesn't exceed 100%", "total must not exceed 100%", () => {
      const total = allocations.reduce(
        (total, alloc) => total + alloc.percentage,
        0
      );
      return 100 - total >= 0;
    }),
});

const shape: SchemaShape<StrategyFormValues> = {
  allocations: Yup.lazy(
    (_a: Allocation[]) =>
      Yup.array(Yup.object().shape(((a: Allocation[]) => allocation(a))(_a))) //supply latest inputs
  ),
};

export const schema = Yup.object(shape);
