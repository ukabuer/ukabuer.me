import { FunctionalComponent, h } from "preact";
import { Head, Style } from "muggle";
import css from "./comment.scss?inline";

const CommentLoader: FunctionalComponent = () => {
	return (
		<div className="lds-ring">
			<Head>
				<Style>{css}</Style>
			</Head>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default CommentLoader;
