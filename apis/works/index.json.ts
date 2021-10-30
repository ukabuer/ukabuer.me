import fetch from "isomorphic-unfetch";
import { API } from "../index.json.js";

export async function get() {
  const page = await (await fetch(`${API}/works`)).json();

  return page;
}
