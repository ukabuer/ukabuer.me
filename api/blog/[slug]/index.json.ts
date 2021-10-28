import { formatDate } from "../../../components/utils/index.js";
import fetch from "isomorphic-unfetch";
import { Article } from "../index.json.js";
import marked from "marked";
import { API } from "../../index.json.js";

export async function get(req: any) {
  const { slug } = req.params;
  const request = await fetch(`${API}/articles?slug=${slug}`);
  const posts = (await request.json()) as Article[];

  if (posts.length < 1) {
    return {
      error: `Not found`,
    };
  }

  const post = posts[0];
  const article = {
    ...post,
    date: formatDate(new Date(post.date)),
    content: marked(post.content),
  };

  return article;
}
