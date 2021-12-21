import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface Props {
  children: ReactNode;
}

type Token = null | {
  token: string;
  apToken: string;
};

type Authorized = {
  isAuthorized: boolean;
};

interface Handlers {
  saveToken: (token: string, type?: string) => void;
  deleteToken: (type?: string) => void;
}

interface AuthorizeHandler {
  saveAuthorize: (authorize: string) => void;
  deleteAuthorize: () => void;
}

export const getContext = createContext<Token>(null);
export const setContext = createContext<Handlers>({
  saveToken: () => {},
  deleteToken: () => {},
});

export const getAuthorized = createContext<Authorized>({
  isAuthorized: false,
});
export const setAuthorized = createContext<AuthorizeHandler>({
  saveAuthorize: () => {},
  deleteAuthorize: () => {},
});

let initialToken: Token = null;

export default function AuthProvider(props: Props) {
  const [token, setToken] = useState<string>(initialToken?.token || "");
  const [apToken, setAPToken] = useState<string>(initialToken?.apToken || "");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedAPToken = localStorage.getItem("aptoken");
    const savedAuthorized = localStorage.getItem("authorized");
    if (savedToken) {
      const decodedToken: JwtPayload = jwtDecode(savedToken);
      const expiry = decodedToken.exp!;
      if (expiry * 1000 <= Date.now()) {
        deleteToken("user");
      } else {
        setToken(savedToken);
      }
    }

    if (savedAPToken) {
      const decodedAPToken: JwtPayload = jwtDecode(savedAPToken);
      const expiryAP = decodedAPToken.exp!;
      if (expiryAP * 1000 <= Date.now()) {
        deleteToken("admin");
      } else {
        setAPToken(savedAPToken);
      }
    }

    if (savedAuthorized) {
      setIsAuthorized(true);
    }
    // eslint-disable-next-line
  }, []);

  function saveToken(token: string, type: string = "user") {
    if (type === "user") {
      localStorage.setItem("token", token);
      setToken(token);
    } else {
      localStorage.setItem("aptoken", token);
      setAPToken(token);
    }
    //sync save token
  }

  function deleteToken(type: string = "user") {
    if (type === "user") {
      localStorage.removeItem("token");
      setToken("");
    } else {
      localStorage.removeItem("aptoken");
      setAPToken("");
    }
    //sync delete token
  }

  async function saveAuthorize(authorize: string) {
    setIsAuthorized(true);
    await localStorage.setItem("authorized", authorize);
  }

  async function deleteAuthorize() {
    setIsAuthorized(false);
    await localStorage.removeItem("authorized");
  }

  return (
    <getContext.Provider value={{ token, apToken }}>
      <setContext.Provider value={{ saveToken, deleteToken }}>
        <getAuthorized.Provider value={{ isAuthorized }}>
          <setAuthorized.Provider value={{ saveAuthorize, deleteAuthorize }}>
            {props.children}
          </setAuthorized.Provider>
        </getAuthorized.Provider>
      </setContext.Provider>
    </getContext.Provider>
  );
}

//you may use these hooks on a component inside AuthProvider
export const useSetToken = () => useContext(setContext);
export const useGetToken = () => useContext(getContext);
export const useSetAuthorized = () => useContext(setAuthorized);
export const useGetAuthorized = () => useContext(getAuthorized);
