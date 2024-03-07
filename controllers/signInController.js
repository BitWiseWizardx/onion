const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");
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
		const createdRegister = await prisma.users.create({
			data: { name, email, password: hashedPassword },
		});
		const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
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
		const loginUser = await prisma.users.findFirst({
			where: {
				email,
			},
		});

		if (!loginUser) {
			return res.status(404).json({ error: "User not found" });
		}
		const match = await bcrypt.compare(password, loginUser.password);
		if (!match) {
			return res.status(401).json({ error: "Incorrect password" });
		}

		const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
		return res.json({ message: "Login Successful", token });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

exports.protectedRoute = async (req, res) => {
	res.json();
};

// Generate a random 256-bit (32-byte) key
// const secretKey = crypto.randomBytes(32).toString("hex");

// console.log("Generated JWT Secret Key:", secretKey);
