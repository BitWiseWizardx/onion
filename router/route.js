const router = require("express").Router();
const incomeRoute = require("./incomeRoute");
const expenseRoute = require("./expenseRoute");
const signInRoute = require("./signInRoute");
const authUserRoute = require("./authUserRoute");

router.use("/income", incomeRoute);
router.use("/expense", expenseRoute);
router.use("/user", signInRoute);
router.use("/auth-user", authUserRoute);

module.exports = router;
