const router = require("express").Router();
const incomeRoute = require("./incomeRoute");
const expenseRoute = require("./expenseRoute");
const signInRoute = require("./signInRoute");
const authUserRoute = require("./authUserRoute");
const totalBalanceRoute = require("./totalBalanceRoute");

router.use("/income", incomeRoute);
router.use("/expense", expenseRoute);
router.use("/user", signInRoute);
router.use("/auth-user", authUserRoute);
router.use("/total-balance", totalBalanceRoute);

module.exports = router;
