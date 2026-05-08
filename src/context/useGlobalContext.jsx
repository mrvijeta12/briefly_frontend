import { useContext } from "react";
import GlobalContext from "./GlobalContext";

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error("useGlobalcontext must be used inside GlobalProvider");
  return ctx;
};
