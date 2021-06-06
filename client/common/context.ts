import { createContext } from "preact";
import { useContext } from "preact/hooks";

const AppContext = createContext<{
  location: string;
  page: unknown;
  loading: boolean;
}>({ location: "", page: {}, loading: false });

export default AppContext;

export const useAppContext = () => useContext(AppContext);
