const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4001;
require("dotenv/config");
const router = require("./router/route");

app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
	console.log(`Server is running in port : ${PORT}`);
});
// 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