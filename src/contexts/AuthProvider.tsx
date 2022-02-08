import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useGetter, useSetter } from "store/accessors";
import { updateTokensData } from "services/tokens/tokenSlice";

interface Props {
  children: ReactNode;
}

type Token = null | {
  token: string;
  apToken: string;
};

interface Handlers {
  saveToken: (token: string, type?: string) => void;
  deleteToken: (type?: string) => void;
}

export const getContext = createContext<Token>(null);
export const setContext = createContext<Handlers>({
  saveToken: () => {},
  deleteToken: () => {},
});

let initialToken: Token = null;

export default function AuthProvider(props: Props) {
  const [token, setToken] = useState<string>(initialToken?.token || "");
  const [apToken, setAPToken] = useState<string>(initialToken?.apToken || "");
  const dispatch = useSetter();
  const tokens = useGetter((state) => state.tokens);

  useEffect(() => {
    if (tokens.token) {
      const decodedToken: JwtPayload = jwtDecode(tokens.token);
      const expiry = decodedToken.exp!;
      if (expiry * 1000 <= Date.now()) {
        deleteToken("user");
      }
    }

    if (tokens.apToken) {
      const decodedAPToken: JwtPayload = jwtDecode(tokens.apToken);
      const expiryAP = decodedAPToken.exp!;
      if (expiryAP * 1000 <= Date.now()) {
        deleteToken("admin");
      }
    }
    // eslint-disable-next-line
  }, []);

  function saveToken(token: string, type: string = "user") {
    if (type === "user") {
      dispatch(
        updateTokensData({
          ...tokens,
          token: token,
        })
      );
      setToken(token);
    } else {
      dispatch(
        updateTokensData({
          ...tokens,
          apToken: token,
        })
      );
      setAPToken(token);
    }
    //sync save token
  }

  function deleteToken(type: string = "user") {
    if (type === "user") {
      dispatch(
        updateTokensData({
          ...tokens,
          token: "",
        })
      );
      setToken("");
    } else {
      dispatch(
        updateTokensData({
          ...tokens,
          apToken: "",
        })
      );
      setAPToken("");
    }
    //sync delete token
  }

  return (
    <getContext.Provider value={{ token, apToken }}>
      <setContext.Provider value={{ saveToken, deleteToken }}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

//you may use these hooks on a component inside AuthProvider
export const useSetToken = () => useContext(setContext);
export const useGetToken = () => useContext(getContext);
