const router = require("express").Router();
const incomeRoute = require("./incomeRoute");

router.use("/income", incomeRoute);
module.exports = router;
