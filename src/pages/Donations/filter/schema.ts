import * as Yup from "yup";
import { SchemaShape } from "schemas/types";

export type FormValues = {
  startDate: Date;
  endDate: Date;
};

const shape: SchemaShape<FormValues> = {
  startDate: Yup.date().min("2018-12-31", "Date is too early").max(new Date()),
  endDate: Yup.date().max(new Date()),
};

export const schema = Yup.object().shape(shape);
