import { h, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import Layout from "../components/Layout";
import * as styles from "./error.css";

const ErrorPage: FunctionComponent = () => {
	const page = { error: "" };
	const data = page as { error: string };

	return (
		<Layout>
			<Head>
				<title>Error</title>
				<Style>{styles.default}</Style>
			</Head>
			<div className={styles.page}>
				<div className={styles.section}>
					<h1>{data.error || "Not Found"}</h1>
				</div>
			</div>
		</Layout>
	);
};

export default ErrorPage;
