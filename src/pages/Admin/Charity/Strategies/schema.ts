import * as Yup from "yup";
import { SchemaShape } from "schemas/types";
import { percentString } from "schemas/number";

type Allocation = {
  percentage: number;
  vault: string;
};

export type StrategyFormValues = {
  allocations: Allocation[];
  unallocated: number;
};

const allocationShape: SchemaShape<Allocation> = {
  percentage: percentString,
};

const shape: SchemaShape<StrategyFormValues> = {
  allocations: Yup.array(Yup.object().shape(allocationShape)),
  //add other vault fields here
};

export const schema = Yup.object(shape);
