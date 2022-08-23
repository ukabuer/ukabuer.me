import { h, FunctionComponent } from "preact";
import { Head, useAppContext } from "muggle";
import site from "../Layout/data";
import css from "./style.scss";

const Footer: FunctionComponent = () => {
  const { path } = useAppContext();

  const isHome = path == "/";

  return (
    <footer className={isHome ? "home" : undefined}>
      <Head>
        <style>{css}</style>
      </Head>
      <p>May the Goddess smile upon you.</p>
      <p>
        <span>© 2014 ~ {new Date().getFullYear()} </span>
        <a href={site.author.link}>{site.author.name}</a>
      </p>
      <p>
        <span>Built with &#129505;</span>
        <span> and </span>
        <a
          href="https://github.com/ukabuer/muggle"
          rel="noreferrer"
          target="_blank"
        >
          muggle
        </a>
      </p>
    </footer>
  );
};

export default Footer;
