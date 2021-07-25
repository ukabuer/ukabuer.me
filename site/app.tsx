import createApp from "../src/app";
import Layout from "./components/Layout";
import ErrorPage from "./error";
import site from "./data";

const app = createApp({ Layout, ErrorPage, site });

export default app;
