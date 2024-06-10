import {
  type PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import type { UnionToIntersection } from "type-fest";
import type {
  EndowDesignation,
  EndowmentsSortKey,
  SortDirection,
} from "types/aws";
import type { SDGGroup } from "types/lists";

export interface Sort {
  key: EndowmentsSortKey;
  direction: SortDirection;
}

type Update =
  | {
      searchText: string;
    }
  | { endow_designation: EndowDesignation[] }
  | { sort?: Sort }
  | { sdgGroups: SDGGroup[] }
  | { kyc_only: boolean[] }
  | { verified: boolean[] }
  | { countries: string[] };

type State = UnionToIntersection<Update>;

interface IContext {
  state: State;
  update: React.Dispatch<Update | "reset">;
}

const initialState: State = {
  sdgGroups: [],
  countries: [],
  searchText: "",
  endow_designation: [],
  kyc_only: [],
  verified: [],
  sort: undefined,
};

function reducer(state: State, update: Update | "reset"): State {
  if (update === "reset") return initialState;
  return { ...state, ...update };
}

const INIT = "INIT" as any;
const context = createContext(INIT as IContext);

export function Context(props: PropsWithChildren) {
  const [state, update] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, update }}>
      {props.children}
    </context.Provider>
  );
}

export function useMarketplaceContext(): IContext {
  const val: any = useContext(context);
  if (val === INIT) {
    throw "useMarketplaceContext can only be used in components inside Marketplace context";
  }
  return val;
}
