import { FunctionComponent } from "preact";
import { Link, useRoute } from "wouter-preact";
import "./header.scss";

const Header: FunctionComponent = () => {
  const [isHome] = useRoute("/");
  const [isWorksPage] = useRoute("/works/");
  const [isBlogPage] = useRoute("/blog/");
  const [isArticlePage] = useRoute("/blog/:article");
  const [isAboutPage] = useRoute("/about/");

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
    </header>
  );
};

export default Header;
