import { Feed } from "feed";
import fetch from "node-fetch";
import { h, FunctionComponent } from "preact";
import { Article } from "../pages/blog/[slug]";

export async function preload() {
  const feed = new Feed({
    title: "ukabuer.me",
    description: "ukabuer's personal site",
    id: "https://ukabuer.me",
    link: "https://ukabuer.me",
    language: "zh",
    copyright: `All rights reserved 2014-${new Date().getFullYear()}, ukabuer`,
  });

  const request = await fetch(`${process.env.API}/articles`);
  const posts = (await request.json()) as Article[];

  posts
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .forEach((item) => {
      feed.addItem({
        title: item.title,
        id: "https://ukabuer.me/blog/" + item.slug,
        link: "https://ukabuer.me/blog/" + item.slug,
        description: item.external ? item.title : item.content.substr(0, 200),
        date: new Date(item.date),
      });
    });

  return feed.json1();
}

type Props = {
  page: string;
};

const RSS: FunctionComponent<Props> = ({ page }: Props) => {
  return <div>{page}</div>;
};

export default RSS;
