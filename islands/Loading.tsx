import { h, FunctionComponent } from "preact";
import { useAppContext } from "muggle";
import * as global from "../components/Layout/global.css.js";

const Loading: FunctionComponent = () => {
	const { loading } = useAppContext();
	return <div className={global.loader}>{loading ? <div /> : null}</div>;
};

export default Loading;
