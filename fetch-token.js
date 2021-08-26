const fetch = require("node-fetch");

// Request parameters
const token_endpoint = "https://icdaccessmanagement.who.int/connect/token";
const client_id = "";
const client_secret = "";
const scope = "icdapi_access";
const grant_type = "client_credentials";

/** Attempt to retrieve an OAuth2 token for the Express server */
async function fetchToken() {
	// Specify request configuration and options
	const options = {
		method: "POST",
		body: `client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&scope=${scope}`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	// Wait for response
	return await fetch(token_endpoint, options)
		.then((data) => data.json())
		.catch((err) => console.log("getToken()", err));
}

module.exports = fetchToken;
