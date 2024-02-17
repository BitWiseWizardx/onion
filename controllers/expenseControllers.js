const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getExpense = async (req, res) => {
	const getExpenses = await prisma.expenses.findMany();
	return res.json(getExpenses);
};

exports.postExpense = async (req, res) => {
	try {
		const newExpense = await prisma.expenses.create({ data: req.body });
		return res.json(newExpense);
	} catch (error) {
		return res.json(error);
	}
};

exports.putExpense = async (req, res) => {
	const id = req.params.id * 1;
	try {
		const updateExpense = await prisma.expenses.update({
			where: {
				id,
			},
			data: req.body,
		});
		return res.json({ updateExpense, message: "Update Successful" });
	} catch (error) {
		return res.json({ error, message: "Something Wrong" });
	}
};

exports.deleteExpense = async (req, res) => {
	const id = req.params.id * 1;
	try {
		const deleteExpense = await prisma.expenses.delete({
			where: {
				id,
			},
		});
		return res.json({ deleteExpense, message: "Delete Successful" });
	} catch (error) {
		return res.json({ error, message: "Something Wrong" });
	}
};
