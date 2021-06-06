import { FunctionComponent } from "preact";
import { Link, useRouter } from "wouter-preact";
import { useAppContext } from "./context";
import "./header.scss";
import Loading from "./Loading";

const Header: FunctionComponent = () => {
  const { matcher } = useRouter();
  const { location, loading } = useAppContext();
  const [isHome] = matcher("/", location);
  const [isWorksPage] = matcher("/works/", location);
  const [isBlogPage] = matcher("/blog/**", location);
  const [isAboutPage] = matcher("/about/", location);

  return (
    <header class={isHome ? "home" : undefined}>
      <nav>
        <Link href="/" className={isHome ? "active" : undefined}>
          首页
        </Link>
        <Link href="/works/" className={isWorksPage ? "active" : undefined}>
          项目
        </Link>
        <Link href="/blog/" className={isBlogPage ? "active" : undefined}>
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
