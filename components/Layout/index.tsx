import { h, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import Header from "../Header";
import Footer from "../Footer";
import css from "./style.scss?inline";

const Layout: FunctionComponent = ({ children }) => {
	return (
		<div id="app">
			<Head>
				<Style>{css}</Style>
				<link
					rel="alternate"
					type="application/rss+xml"
					title="ukabuer's personal site"
					href="/feed.xml"
				/>
				<link rel="shortcut icon" href="/static/favicon.png" type="image/png" />
			</Head>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
