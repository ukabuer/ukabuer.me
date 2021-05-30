import jsYaml from "js-yaml";
import marked from "marked";
import fs from "fs/promises";
import { resolve, basename } from "path";

const regexp = /^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?([\w\W]*)*/;
const base = "data";

export async function getData(path: string): Promise<Record<string, unknown>> {
  const raw = await fs.readFile(resolve(base, path), "utf8");
  const data: Record<string, unknown> = {
    content: "",
  };

  const res = regexp.exec(raw);
  let yaml = "";
  let markdown = "";
  if (res) {
    yaml = res[2];
    markdown = res[3];
  }

  const extracted = yaml ? jsYaml.load(yaml) : {};
  Object.assign(data, extracted);
  if (markdown) {
    data.content = marked(markdown);
  }

  return data;
}

export async function getPagesInDir(dir: string) {
  const prefix = resolve(base, dir);
  const names = await fs.readdir(resolve(base, dir));
  const paths = names.map((name) => resolve(prefix, name));

  const tasks = paths.map(async (path) => {
    const stat = await fs.stat(path);
    if (stat.isFile()) {
      return null;
    }

    const md = resolve(path, "index.md");
    const exist = await fs.stat(md);
    if (!exist || !exist.isFile()) {
      return null;
    }

    return {
      slug: basename(path),
      path: md,
    };
  });
  const markdowns = (await Promise.all(tasks)).filter((item) => !!item);

  return markdowns;
}

/**
 * format Date to date string
 * @param {Date} time
 */
export function formatDate(time: Date) {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();

  return `${year}-${month}-${date}`;
}
