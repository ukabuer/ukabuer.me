import { FunctionalComponent, h } from "preact";
import { Head, Style } from "muggle";
import * as styles from "./comment.css.js";

const CommentLoader: FunctionalComponent = () => {
	return (
		<div className={styles.loader}>
			<Head>
				<Style>{styles.default}</Style>
			</Head>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
};

export default CommentLoader;
