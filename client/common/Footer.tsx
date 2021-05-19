import { FunctionComponent } from "preact";
import { Link } from "preact-router";
import site from "./site";
import "./footer.scss";

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <p>May the Goddess smile upon you.</p>
      <p>
        <span>© 2014 ~ {new Date().getFullYear()}</span>
        <Link href={site.author.link}>{site.author.name}</Link>
      </p>
      <p>
        <span>Built with ❤ and </span>
        <a href="https://preactjs.com" target="_blank">
          preact
        </a>
      </p>
    </footer>
  );
};

export default Footer;
