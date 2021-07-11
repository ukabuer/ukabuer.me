import { Feed } from "feed";
import { getData, getPagesInDir } from "../../utils";

const dev = process.env.NODE_ENV === "development";

export async function get(req: any, res: any) {
  const feed = new Feed({
    title: "ukabuer.me",
    description: "ukabuer's personal site",
    id: "https://ukabuer.me",
    link: "https://ukabuer.me",
    language: "zh",
    copyright: `All rights reserved 2014-${new Date().getFullYear()}, ukabuer`,
  });

  const files = await getPagesInDir("blog");
  const tasks = files.map(async (file) => {
    if (!file) return null;
    const page = await getData(file.path);
    return { ...page, slug: file.slug } as any;
  });
  const posts = await (await Promise.all(tasks)).filter((v) => v != null);

  posts
    .filter((post) => dev || !post.draft)
    .sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })
    .forEach((item) => {
      feed.addItem({
        title: item.title,
        id: "https://ukabuer.me/blog/" + item.slug,
        link: "https://ukabuer.me/blog/" + item.slug,
        description: item.content.substr(0, 200),
        date: item.date,
      });
    });

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(feed.json1());
}
