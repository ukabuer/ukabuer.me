import { formatDate } from "../../../utils";
import fetch from 'isomorphic-unfetch';
import { Article } from "../api";
import marked from "marked";
import { API } from "../../api";

export async function get(req: any, res: any) {
  const { slug } = req.params;
  const request = await fetch(`${API}/articles?slug=${slug}`);
  const posts = await request.json() as Article[];

  if (posts.length < 1) {
    res.end(
      JSON.stringify({
        error: `Not found`,
      })
    );
    return;
  }

  const post = posts[0];
  const article = {
    ...post,
    date: formatDate(new Date(post.date)),
    content: marked(post.content)
  }

  res.end(JSON.stringify(article));
}
