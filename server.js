const fetchToken = require("./fetch-token");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 42069;
const corsOpts = {
	// TODO: Add website location to origin once hosted
	origin: [`http://localhost:${port}`, "https://www.google.com/"],
	optionsSuccessStatus: 200,
};

// Load up static webpage
app.use(express.static("public"));

// Initialize server middleware
app.get("/token", cors(corsOpts), async function (req, res) {
	console.log(`Token retrieved from http://localhost:${port}/token`);
	// Retrieve a token and forward it to the Express server on demand
	res.send(await fetchToken());
});

app.listen(port, () => {
	// Logging server status
	console.log(`App listening at http://localhost:${port}`);
	console.log(`Token hosted at http://localhost:${port}/token`);
});
