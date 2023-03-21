import { h, FunctionComponent } from "preact";
import { Head } from "muggle";
import css from "./style.scss?inline";

const Loading: FunctionComponent = () => {
	return (
		<div className="page-loader">
			<Head>
				<style>{css}</style>
			</Head>
			<div />
		</div>
	);
};

export default Loading;
