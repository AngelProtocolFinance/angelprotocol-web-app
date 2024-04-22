import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

const UserState = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
    } else {
      try {
        const getUser = async () => {
          const res = await axios({
            method: "get",
            url: "/api/user/getUser",
            headers: {
              authToken: localStorage.getItem("token"),
            },
          });
          setUser(res.data.User);
        };
        getUser();
      } catch (error) {
        alert(error.message);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
