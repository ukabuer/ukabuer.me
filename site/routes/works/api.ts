import fetch from 'isomorphic-unfetch';
import { API } from '../api';

export async function get(req: any, res: any) {
  const page = await (await fetch(`${API}/works`)).json();

  res.end(JSON.stringify(page));
}
