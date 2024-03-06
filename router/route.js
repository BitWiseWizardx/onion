const router = require("express").Router();
const incomeRoute = require("./incomeRoute");
const expenseRoute = require("./expenseRoute");
const signInRoute = require("./signInRoute");

router.use("/income", incomeRoute);
router.use("/expense", expenseRoute);
router.use("/admin", signInRoute);

module.exports = router;
