const router = require("express").Router();
const incomeRoute = require("./incomeRoute");
const expenseRoute = require("./expenseRoute");

router.use("/income", incomeRoute);
router.use("/expense", expenseRoute);
module.exports = router;
