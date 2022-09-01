import * as Yup from "yup";
import { SchemaShape } from "schemas/types";

export type Allocation = {
  percentage: number;
  vault: string;
};

export type StrategyFormValues = {
  allocations: Allocation[];
  unallocated: number;
};

const allocationShape: SchemaShape<Allocation> = {
  percentage: Yup.number()
    .moreThan(0, "must be at least 0.01%")
    .max(100, "can't be more than 100%"),
};

const shape: SchemaShape<StrategyFormValues> = {
  allocations: Yup.array(Yup.object().shape(allocationShape)),
  //add other vault fields here
};

export const schema = Yup.object(shape);
