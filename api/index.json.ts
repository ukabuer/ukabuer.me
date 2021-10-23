import fetch from 'isomorphic-unfetch';

export const API = process.env.API || '';

export async function get() {
  const request = await fetch(`${process.env.API}/home`);
  const page = await request.json();

  return page;
}
