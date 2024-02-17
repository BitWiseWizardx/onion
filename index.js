const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors());
// app.get("/", (req, res) => {
// 	return res.json("hello");
// });
// app.get("/", async (req, res) => {
// 	const data = await prisma.user_contact.findMany();
// 	return res.json(data);
// });
app.get("/", async (req, res) => {
	const incomeData = await prisma.incomes.findMany();
	return res.json(incomeData);
});

app.post("/income", async (req, res) => {
	const { description, amount } = req.body;

	const newData = await prisma.incomes.create({ data: req.body });
	return res.json(newData);
});

app.put("/income/:id", async (req, res) => {
	const id = req.params.id * 1;
	try {
		const updateUser = await prisma.incomes.update({
			where: {
				id,
			},
			data: req.body,
		});
		return res.json(updateUser);
	} catch (error) {
		return res.json(error);
	}
});

app.delete("/income/:id", async (req, res) => {
	const id = req.params.id * 1;
	try {
		const deletedUser = await prisma.incomes.delete({
			where: {
				id,
			},
		});
		const remainUser = await prisma.incomes.findMany();
		console.log(remainUser);
		return res.json({ deletedUser: deletedUser, remainUser: remainUser });
	} catch (error) {
		return res.json(error);
	}
});

app.listen(PORT, () => {
	console.log(`Server is running in port : ${PORT}`);
});
