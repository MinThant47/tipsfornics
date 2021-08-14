import { createContext, useContext } from "react";
import useFirestore from "../hooks/useFirestore";

const TipContext = createContext();

export function useTip() {
  return useContext(TipContext);
}

const TipProvider = ({ children }) => {
  const { docs: tips } = useFirestore("tips");
  const { docs: categories } = useFirestore("categories");

  const value = {
    tips,
    categories,
  };
  return <TipContext.Provider value={value}>{children}</TipContext.Provider>;
};

export default TipProvider;
