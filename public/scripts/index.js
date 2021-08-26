import { token, initToken, getData, search } from "./fetch.js";

const tokenDisplay = document.getElementById("token-display");
const dataDisplay = document.getElementById("data-display");

/** Updates the DOM with data from the ICD API */
async function fetchAPI() {
	if (!token) await initToken();

	tokenDisplay.innerHTML = "Token:<br>" + token["access_token"];
	dataDisplay.innerText = JSON.stringify(await getData(""));
	dataDisplay.innerHTML += "<br><br>" + JSON.stringify(await search("ebola"));
}

/** Resets the API token and updates the DOM on demand */
async function refreshToken() {
	await initToken();
	tokenDisplay.innerHTML = "Token:<br>" + token["access_token"];
}

document.getElementById("fetch-button").addEventListener("click", fetchAPI, false);
document.getElementById("refresh-button").addEventListener("click", refreshToken, false);
