import { FunctionComponent } from "preact";
import { Link } from "preact-router";
import './header.scss'

const Header: FunctionComponent = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/works/">Works</Link>
        <Link href="/blog/">Blog</Link>
        <Link href="/about/">About</Link>
      </nav>
    </header>
  );
};

export default Header;
