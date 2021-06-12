import { getData, getPagesInDir, formatDate } from "../../utils";

const dev = process.env.NODE_ENV === "development";

export async function get(req: any, res: any) {
  const data = await getData("blog/index.md");

  const files = await getPagesInDir("blog");
  const tasks = files.map(async (file) => {
    if (!file) return null;
    const page = await getData(file.path);
    return { ...page, slug: file.slug } as any;
  });
  const posts = await (await Promise.all(tasks)).filter((v) => v != null);

  const sorted = posts
    .filter((post) => dev || !post.draft)
    .sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    })
    .map((item) => {
      item.date = formatDate(item.date);
      delete item.content;
      return item;
    });

  res.json({
    ...data,
    posts: sorted,
  });
}
