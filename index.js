const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
	return res.json("hello");
});

app.listen(PORT, () => {
	console.log(`Server is running in port : ${PORT}`);
});
