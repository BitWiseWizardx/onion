const router = require("express").Router();
const {
	postIncome,
	getIncome,
	putIncome,
	deleteIncome,
	getOneIncome,
	searchIncome,
} = require("../controllers/incomeControllers");
const { varifyToken } = require("../middleware/varifyToken");

// router.get("/", getIncome);
// router.post("/", postIncome);
// router.put("/:id", putIncome);
// router.delete("/:id", deleteIncome);

router.route("/").get(varifyToken, getIncome).post(postIncome);
router.route("/:id").put(putIncome).delete(deleteIncome).get(getOneIncome);
router.route("/search").post(searchIncome);

module.exports = router;
