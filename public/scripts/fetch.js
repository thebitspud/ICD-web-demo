// TODO: Change this once you get an actual server up
const token_location = "http://localhost:42069/token";

/** ICD API Token */
export let token;

/** Get fresh token from the Express server */
export async function initToken() {
	return (token = await fetch(token_location)
		.then((data) => data.json())
		.catch((err) => console.log("initToken()", err)));
}

const uri = "https://id.who.int/icd/entity";

/** Retrieve a data entry from the ICD API (requires token) */
export async function getData(id) {
	// Set request headers
	const options = {
		method: "GET",
		headers: {
			"Authorization": `${token["token_type"]} ${token["access_token"]}`,
			"Accept": "application/json",
			"Accept-Language": "en",
			"API-Version": "v2",
		},
	};

	// Wait for response
	return await fetch(`${uri}/${id}`, options)
		.then((data) => data.json())
		.catch((err) => console.log("getData()", err));
}

/** Returns the first data entry that matches the given query term */
export async function search(term) {
	// Search database for matches
	let response = await getData(encodeURI(`search?q=${term}`));
	let results = response["destinationEntities"];

	// Return data entry for the first match
	let id = results[0].id.match(/\d+/)[0];
	return await getData(id);
}
