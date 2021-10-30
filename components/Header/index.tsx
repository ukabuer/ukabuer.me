import { FunctionComponent } from "preact";
import { useAppContext, Link } from "muggle/client";
import Loading from "../Loading";
import "./style.scss";

const Header: FunctionComponent = () => {
  const { location, loading } = useAppContext();
  const isHome = "/" === location;
  const isWorksPage = "/works/" === location;
  const isBlogPage = "/blog/" === location;
  const isArticlePage = location.indexOf("/blog/") !== -1;
  const isAboutPage = "/about/" === location;

  return (
    <header class={isHome ? "home" : undefined}>
      <nav>
        <Link href="/" className={isHome ? "active" : undefined}>
          首页
        </Link>
        <Link href="/works/" className={isWorksPage ? "active" : undefined}>
          项目
        </Link>
        <Link
          href="/blog/"
          className={isBlogPage || isArticlePage ? "active" : undefined}
        >
          文章
        </Link>
        <Link href="/about/" className={isAboutPage ? "active" : undefined}>
          关于
        </Link>
      </nav>
      {loading && <Loading />}
    </header>
  );
};

export default Header;
