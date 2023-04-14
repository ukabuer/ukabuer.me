const API = process.env.API || "";
const TOKEN = process.env.TOKEN || "";

if (!API || !TOKEN) {
	console.error("No API or TOKEN provided in env.");
	process.exit(1);
}

type Item = {
	attributes: unknown;
};

async function query(path: string) {
	const request = await fetch(`${API}/api${path}`, {
		headers: {
			Authorization: `bearer ${TOKEN}`,
		},
	});

	const json = await request.json();

	return json.data;
}

function isArray(data: unknown): data is Array<Item> {
	return Array.isArray(data);
}

export { query, isArray };
