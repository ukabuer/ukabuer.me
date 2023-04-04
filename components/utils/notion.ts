import * as Notion from "@notionhq/client";

const TOKEN = process.env.NOTION_TOKEN || "";

if (!TOKEN) {
	console.error("Please set NOTION_TOKEN in enviroment variabels.");
	process.exit();
}

const notion = new Notion.Client({
	auth: TOKEN,
});

export default notion;
