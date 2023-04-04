import { h, FunctionComponent } from "preact";
import { Head, Style, useAppContext } from "muggle";
import Loading from "../../islands/Loading";
import * as styles from "./header.css.js";

const Header: FunctionComponent = () => {
	const { path } = useAppContext();

	const location = path;
	const isHome = "/" === location;
	const isWorksPage = "/works/" === location;
	const isBlogPage = "/blog/" === location;
	const isArticlePage = location.indexOf("/blog/") !== -1;
	const isAboutPage = "/about/" === location;

	return (
		<header className={isHome ? styles.homeHeader : styles.header}>
			<Head>
				<Style>{styles.default}</Style>
			</Head>
			<nav>
				<a href="/" className={isHome ? styles.activeLink : styles.link}>
					首页
				</a>
				<a
					href="/works/"
					className={isWorksPage ? styles.activeLink : styles.link}
				>
					项目
				</a>
				<a
					href="/blog/"
					className={
						isBlogPage || isArticlePage ? styles.activeLink : styles.link
					}
				>
					文章
				</a>
				<a
					href="/about/"
					className={isAboutPage ? styles.activeLink : styles.link}
				>
					关于
				</a>
			</nav>
			<Loading />
		</header>
	);
};

export default Header;
