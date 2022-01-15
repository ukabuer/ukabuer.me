import fetch from "isomorphic-unfetch";
import { marked } from "marked";
import { API } from "../index.json.js";

export async function get() {
  const page = await (await fetch(`${API}/about`)).json();

  page.content = marked(page.content);

  return page;
}
