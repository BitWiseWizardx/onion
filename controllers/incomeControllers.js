const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getIncome = async (req, res) => {
	const newIncome = await prisma.incomes.findMany();
	return res.json(newIncome);
};

exports.postIncome = async (req, res) => {
	const { description, amount } = req.body;

	const newData = await prisma.incomes.create({ data: req.body });
	return res.json(newData);
};

exports.putIncome = async (req, res) => {
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
};

exports.deleteIncome = async (req, res) => {
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
};
