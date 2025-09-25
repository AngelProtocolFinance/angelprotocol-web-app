import type { useSearchParams } from "react-router";
export interface IFilter {
  _key: string;
  is_active: boolean;
  values?: string[];
  onChange: (v: string[]) => void;
}

export const filter_factory =
  (...[params, setParams]: ReturnType<typeof useSearchParams>) =>
  (k: string): IFilter => {
    const values = params.get(k)?.split(",") || [];
    return {
      _key: k,
      is_active: values.length > 0,
      values,
      onChange: (vs: string[]) => {
        setParams((p) => {
          if (vs.length === 0) {
            p.delete(k);
            return p;
          }
          p.set(k, vs.join(","));
          return p;
        });
      },
    };
  };
