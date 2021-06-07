import { getData, getPagesInDir, formatDate } from "../../../utils";

export async function get(req: any, res: any) {
  const { slug } = req.params;

  const lookup = new Map();
  const pages = await getPagesInDir("blog");
  pages.forEach((page: any) => {
    lookup.set(page.slug, page.path);
  });
  if (!lookup.has(slug)) {
    res.json({
      error: `Not found`,
    });
    return;
  }

  const page: any = await getData(lookup.get(slug));
  page.date = formatDate(page.date);

  res.json(page);
}
