const router = require("express").Router();
const {
	postIncome,
	getIncome,
	putIncome,
	deleteIncome,
} = require("./controllers/incomeControllers");

router.get("/", getIncome);
router.post("/income", postIncome);
router.put("/income/:id", putIncome);
router.delete("/income/:id", deleteIncome);

module.exports = router;
