const router = require("express").Router();

const {
	getRegister,
	createRegister,
	getLogin,
	protectedRoute,
} = require("../controllers/signInController");
const { varifyToken } = require("../middleware/varifyToken");

router.route("/register").get(getRegister).post(createRegister);
router.route("/login").post(getLogin);
router.route("/protected").get(varifyToken, protectedRoute);

module.exports = router;
