const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getRegister = async (req, res) => {
	const registerData = await prisma.users.findMany();
	return res.json(registerData);
};

exports.createRegister = async (req, res) => {
	try {
		const saltRounds = 10;
		const { name, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		
		const user = await prisma.users.findUnique({where: {email}})
		if(user){
			return res.json({error: "User already exists"})
		}
		const createdRegister = await prisma.users.create({
			data: { name, email, password: hashedPassword },
		});
		
		// create total balance
		const totalBalance= await prisma.total_balance.create({
			data: { user_id: createdRegister.id, balance: 0 },
		})
		const token = jwt.sign(
			{ id: createdRegister.id },
			process.env.TOKEN_SECRET
		);
		return res.json({
			message: "Data retrieved successfully",
			createdRegister,
			token,
		});
	} catch (error) {
		res.json(error);
	}
};

exports.getLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const loginUser = await prisma.users.findUnique({
			where: {
				email,
			},
		});

		if (!loginUser) {
			return res.status(404).json({ error: "User not found" });
		}
		const match = await bcrypt.compare(password, loginUser.password);
		if (!match) {
			return res
				.status(401)
				.json({ error: "Incorrect password", status: 401 });
		}

		const token = jwt.sign({ id: loginUser.id }, process.env.TOKEN_SECRET);
		return res.json({ message: "Login Successful", token });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.protectedRoute = async (req, res) => {
	const id = req.body.id;
	const user = await prisma.admin.findUnique({
		where: {
			id,
		},
	});
	return res.json({ msg: "success", user });
};

// Generate a random 256-bit (32-byte) key
// const secretKey = crypto.randomBytes(32).toString("hex");

// console.log("Generated JWT Secret Key:", secretKey);
