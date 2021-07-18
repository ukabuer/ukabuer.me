import { formatDate } from "../../utils";
import fetch from 'isomorphic-unfetch';
import { API } from "../api";

export type Article = {
  title: string;
  slug: string;
  content: string;
  external: string;
  date: string;
}

export async function get(req: any, res: any) {
  const page = await (await fetch(`${API}/blog`)).json();
  const request = await fetch(`${API}/articles`);
  const posts = await request.json() as Article[];

  const sorted = posts
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((item) => ({
      title: item.title,
      slug: item.slug,
      external: item.external,
      date: formatDate(new Date(item.date)),
    }));

  res.end(
    JSON.stringify({
      ...page,
      posts: sorted,
    })
  );
}
