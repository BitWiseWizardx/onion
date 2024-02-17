const router = require("express").Router();
const {
	getExpense,
	postExpense,
	putExpense,
	deleteExpense,
} = require("../controllers/expenseControllers");

// router.get("/", getExpense);
// router.post("/", postExpense);
// router.put("/:id", putExpense);
// router.delete("/:id", deleteExpense);
router.route("/").get(getExpense).post(postExpense);
router.route("/:id").put(putExpense).delete(deleteExpense);
module.exports = router;
