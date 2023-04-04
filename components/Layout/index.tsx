import { h, FunctionComponent } from "preact";
import { Head, Style } from "muggle";
import Header from "../Header";
import Footer from "../Footer";
import * as styles from "./global.css.js";

const Layout: FunctionComponent = ({ children }) => {
	return (
		<div id="app" data-pjax-wrapper>
			<Head>
				<Style>{styles.default}</Style>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="theme-color" content="#e06767" />
				<meta name="msapplication-navbutton-color" content="#e06767" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
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
