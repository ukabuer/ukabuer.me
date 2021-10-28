import { FunctionComponent } from "preact";
import { useRouter } from "wouter-preact";
import { Link, useAppContext } from "muggle/client";
import site from '../Layout/data';
import "./style.scss";

const Footer: FunctionComponent = () => {
  const { location } = useAppContext();
  const { matcher } = useRouter();
  console.log(location)
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
        <a href="https://github.com/ukabuer/muggle" target="_blank">
          muggle
        </a>
      </p>
    </footer>
  );
};

export default Footer;
