const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// exports.getIncome = async (req, res) => {
// 	const newIncome = await prisma.incomes.findMany();
// 	return res.json(newIncome);
// };

exports.getIncome = async (req, res) => {
	const newIncome = await prisma.incomes.findMany({
		where: {
			user_id: req.body.user_id,
		},
	});
	return res.json(newIncome);
};

exports.postIncome = async (req, res) => {
	try {
		// create new income data
		const data = {
			user_id: req.body.user_id,
			description: req.body.description,
			amount: req.body.amount,
		};
		const newData = await prisma.incomes.create({ data: data });

		try {
			// update total balance of the user
			/**
			 * Increment the balance of the user by the amount of the income
			 * that was just created
			 */
			const lastTotalBalance= await prisma.total_balance.findUnique({
				where: {
					user_id: newData.user_id,
				}
			})

			const newBalance = lastTotalBalance.balance + newData.amount
			const updatedData = await prisma.total_balance.update({
				where: {
					user_id: newData.user_id,
				},
				data: {
					balance: newBalance
				},
			});
			return res.json({
				newData,
				total_balance: updatedData,
				message: "Income created successfully",
			});

		} catch (error) {
			return res.json(error);
		}
	} catch (error) {
		return res.json(error);
	}


	
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

exports.getOneIncome = async (req, res) => {
	const id = req.params.id * 1;
	try {
		const getOneIncome = await prisma.incomes.findUnique({
			where: {
				id,
			},
		});
		return res.json(getOneIncome);
	} catch (error) {
		return res.json(error);
	}
};

exports.searchIncome = async (req, res) => {
	const { query } = req.body;
	try {
		const searchIncome = await prisma.incomes.findMany({
			where: {
				description: { contains: query },
			},
		});
		return res.json(searchIncome);
	} catch (error) {
		return res.json(error);
	}
};
