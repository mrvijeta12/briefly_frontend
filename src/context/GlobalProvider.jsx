import { useState } from "react";
import GlobalContext from "./GlobalContext.jsx";

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // console.log("user", user);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
