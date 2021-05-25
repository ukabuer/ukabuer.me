import { FunctionComponent } from "preact";
import { Link } from "preact-router";
import './header.scss'

const Header: FunctionComponent = () => {
  return (
    <header>
      <nav>
        <Link href="/" activeClassName="active">Home</Link>
        <Link href="/works/" activeClassName="active">Works</Link>
        <Link href="/blog/" activeClassName="active">Blog</Link>
        <Link href="/about/" activeClassName="active">About</Link>
      </nav>
    </header>
  );
};

export default Header;
