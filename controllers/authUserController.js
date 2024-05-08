const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAuthUsers = async (req, res) => {
	const getAuthUser = await prisma.users.findUnique({
		where: {
			id: req.body.user_id,
		
		},
		include: {
			total_balance: true,
		},
	});
	// we will add total balance in here along with getAuthUser
	return res.json(getAuthUser);
};
