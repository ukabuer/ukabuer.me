import { createContext } from "preact";
import { useContext } from "preact/hooks";

const AppContext = createContext<{
  page: unknown;
}>({ page: {} });

export default AppContext;

export const useAppContext = () => useContext(AppContext);
