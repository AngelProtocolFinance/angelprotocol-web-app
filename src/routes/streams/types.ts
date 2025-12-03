interface IBase {
  env: "staging" | "production";
}

interface IModify<T = unknown> extends IBase {
  type: "modify";
  prev: T;
  curr: T;
}
interface IInsert<T = unknown> extends IBase {
  type: "insert";
  data: T;
}

interface IDelete<T = unknown> extends IBase {
  type: "delete";
  data: T;
}

export type TPayload<T = unknown> = IModify<T> | IInsert<T> | IDelete<T>;
