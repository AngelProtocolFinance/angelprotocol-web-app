import { createContext, ReactNode, useContext, useState } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface Props {
  children: ReactNode;
}
type Token = null | string;

interface Handlers {
  saveToken: (token: string) => void;
  deleteToken: () => void;
}

const getContext = createContext<Token>(null);
const setContext = createContext<Handlers>({
  saveToken: () => {},
  deleteToken: () => {},
});

//sync get token from local storage after refresh before loading this Provider

let initialToken: Token = null;
const savedToken = localStorage.getItem("token");
if (savedToken) {
  const decodedToken: JwtPayload = jwtDecode(savedToken);
  const expiry = decodedToken.exp!;
  if (expiry * 1000 <= Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialToken = savedToken;
  }
}

export default function AuthProvider(props: Props) {
  const [token, setToken] = useState<Token>(initialToken);

  function saveToken(token: string) {
    setToken(token);
    //sync save token
    localStorage.setItem("token", token);
  }

  function deleteToken() {
    setToken(null);
    //sync delete token
    localStorage.removeItem("token");
  }

  return (
    <getContext.Provider value={token}>
      <setContext.Provider value={{ saveToken, deleteToken }}>
        {props.children}
      </setContext.Provider>
    </getContext.Provider>
  );
}

export const useSetToken = () => useContext(setContext);
export const useGetToken = () => useContext(getContext);
