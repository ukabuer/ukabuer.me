import { h, FunctionComponent } from "preact";
import { Head } from "muggle";
import Layout from "../components/Layout";

const NotFoundPage: FunctionComponent = () => {
	return (
		<Layout>
			<Head>
				<title>Error</title>
			</Head>
			<div className="page error">
				<div className="section">
					<h1>Not Found</h1>
				</div>
			</div>
		</Layout>
	);
};

export default NotFoundPage;
