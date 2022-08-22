import { h, FunctionComponent } from "preact";
import { Head, useAppContext } from "muggle";
import Loading from "../Loading";
import css from "./style.scss";

const Header: FunctionComponent = () => {
  const { path } = useAppContext();

  const location = path;
  const loading = false;
  const isHome = "/" === location;
  const isWorksPage = "/works/" === location;
  const isBlogPage = "/blog/" === location;
  const isArticlePage = location.indexOf("/blog/") !== -1;
  const isAboutPage = "/about/" === location;

  return (
    <header class={isHome ? "home" : undefined}>
      <Head>
        <style>{css}</style>
      </Head>
      <nav>
        <a href="/" className={isHome ? "active" : undefined}>
          首页
        </a>
        <a href="/works/" className={isWorksPage ? "active" : undefined}>
          项目
        </a>
        <a
          href="/blog/"
          className={isBlogPage || isArticlePage ? "active" : undefined}
        >
          文章
        </a>
        <a href="/about/" className={isAboutPage ? "active" : undefined}>
          关于
        </a>
      </nav>
      {loading && <Loading />}
    </header>
  );
};

export default Header;
