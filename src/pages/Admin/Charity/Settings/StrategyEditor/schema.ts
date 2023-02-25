import * as Yup from "yup";
import { Allocation, FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { PCT_PRECISION } from "./constants";

type AllocationSchema = (allocations: Allocation[]) => SchemaShape<Allocation>;
const allocation: AllocationSchema = (allocations) => ({
  percentage: Yup.number()
    //pct must be greater than 0.009 or be rounded down to 0
    .min(9 * Math.pow(10, -PCT_PRECISION - 1), "invalid percentage")
    .max(100, "can't be more than 100%")
    .test("total doesn't exceed 100%", "total must not exceed 100%", () => {
      const total = allocations.reduce(
        (total, alloc) => total + alloc.percentage,
        0
      );
      return total <= 100;
    }),
});

const shape: SchemaShape<FormValues> = {
  allocations: Yup.lazy(
    (_a: Allocation[]) =>
      Yup.array(Yup.object().shape(((a: Allocation[]) => allocation(a))(_a))) //supply latest inputs
  ),
};

export const schema = Yup.object(shape);
