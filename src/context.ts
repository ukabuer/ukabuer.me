import { createContext } from "preact";
import { useContext } from "preact/hooks";
import site from '../site/data'

const AppContext = createContext<{
  site: typeof site;
  page: unknown;
  location: string;
  loading: boolean;
}>({ site, page: {}, location: "", loading: false });

export default AppContext;

export const useAppContext = () => useContext(AppContext);
