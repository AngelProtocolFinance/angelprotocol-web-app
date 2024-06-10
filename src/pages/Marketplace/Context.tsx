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

interface Sort {
  key: EndowmentsSortKey;
  direction: SortDirection;
}

type Update =
  | {
      searchText: string;
    }
  | { endowDesignation: EndowDesignation[] }
  | { sort?: Sort }
  | { sdgGroups: SDGGroup[] }
  | { kycOnly: boolean[] }
  | { verified: boolean[] }
  | { countries: string[] };

type State = UnionToIntersection<Update>;

interface IContext {
  state: State;
  dispatch: React.Dispatch<Update>;
}

function reducer(state: State, update: Update): State {
  return Object.assign(state, update);
}

const INIT = "INIT" as any;
const context = createContext(INIT as IContext);

export function Context(props: PropsWithChildren) {
  const initialState: State = {
    sdgGroups: [],
    countries: [],
    searchText: "",
    endowDesignation: [],
    kycOnly: [],
    verified: [],
    sort: undefined,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>
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
