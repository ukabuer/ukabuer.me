import { getData, getPagesInDir, formatDate } from "../../../utils";

export async function get(req: any, res: any) {
  const { slug } = req.params;

  const lookup = new Map();
  const pages = await getPagesInDir("blog");
  pages.forEach((page: any) => {
    lookup.set(page.slug, page.path);
  });

  if (!lookup.has(slug)) {
    res.end(
      JSON.stringify({
        error: `Not found`,
      })
    );
    return;
  }

  const page: any = await getData(lookup.get(slug));
  page.date = formatDate(page.date);

  res.end(JSON.stringify(page));
}
