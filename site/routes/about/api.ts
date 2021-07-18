import fetch from 'isomorphic-unfetch';
import marked from 'marked';
import { API } from '../api';

export async function get(req: any, res: any) {
  const page = await (await fetch(`${API}/about`)).json();

  page.content = marked(page.content);

  res.end(JSON.stringify(page));
}
