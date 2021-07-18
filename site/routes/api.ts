import fetch from 'isomorphic-unfetch';

export const API = process.env.API || '';

export async function get(req: any, res: any) {
  const request = await fetch(`${process.env.API}/home`);
  const page = await request.json();

  res.end(JSON.stringify(page));
}
