import { FunctionComponent } from "preact";
import { Link, useRouter } from "wouter-preact";
import { useAppContext } from "../../../src/context";
import "./style.scss";

const Footer: FunctionComponent = () => {
  const { site, location } = useAppContext();
  const { matcher } = useRouter();
  const [isHome] = matcher("/", location);

  return (
    <footer className={isHome ? 'home' : undefined}>
      <p>May the Goddess smile upon you.</p>
      <p>
        <span>© 2014 ~ {new Date().getFullYear()} </span>
        <Link href={site.author.link}>{site.author.name}</Link>
      </p>
      <p>
        <span>Built with &#129505;</span>
        <span> and </span>
        <a href="https://preactjs.com" target="_blank">
          preact
        </a>
      </p>
    </footer>
  );
};

export default Footer;
