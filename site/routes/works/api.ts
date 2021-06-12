import { getData } from "../../utils";

export async function get(req: any, res: any) {
  const page = await getData("works/index.md");

  res.end(JSON.stringify(page));
}
