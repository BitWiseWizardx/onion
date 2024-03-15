const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAuthUsers = async (req, res) => {
	const getAuthUser = await prisma.users.findFirst({
		where: {
			id: req.body.user_id,
		},
	});
	return res.json(getAuthUser);
};
