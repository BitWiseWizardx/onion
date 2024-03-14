const router = require("express").Router();
const {
	getExpense,
	postExpense,
	putExpense,
	deleteExpense,
} = require("../controllers/expenseControllers");
const { varifyToken } = require("../middleware/varifyToken");

// router.get("/", getExpense);
// router.post("/", postExpense);
// router.put("/:id", putExpense);
// router.delete("/:id", deleteExpense);
router.route("/").get(varifyToken, getExpense).post(varifyToken, postExpense);
router.route("/:id").put(putExpense).delete(deleteExpense);
module.exports = router;
