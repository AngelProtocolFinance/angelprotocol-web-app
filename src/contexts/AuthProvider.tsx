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
type Token = null | string;

interface Handlers {
  saveToken: (token: string) => void;
  deleteToken: () => void;
}

export const getContext = createContext<Token>(null);
export const setContext = createContext<Handlers>({
  saveToken: () => {},
  deleteToken: () => {},
});

let initialToken: Token = null;

export default function AuthProvider(props: Props) {
  const [token, setToken] = useState<Token>(initialToken);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decodedToken: JwtPayload = jwtDecode(savedToken);
      const expiry = decodedToken.exp!;
      if (expiry * 1000 <= Date.now()) {
        deleteToken();
      } else {
        setToken(savedToken);
      }
    }
    // eslint-disable-next-line
  }, []);

  function saveToken(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
    //sync save token
  }

  function deleteToken() {
    localStorage.removeItem("token");
    setToken(null);
    //sync delete token
  }

  return (
    <getContext.Provider value={token}>
      <setContext.Provider value={{ saveToken, deleteToken }}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

//you may use these hooks on a component inside AuthProvider
export const useSetToken = () => useContext(setContext);
export const useGetToken = () => useContext(getContext);
