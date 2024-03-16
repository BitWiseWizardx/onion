const router = require("express").Router();
const { getTotalBalance } = require("../controllers/totalBalanceController");
const { varifyToken } = require("../middleware/varifyToken");

router.route("/").get(varifyToken, getTotalBalance);

module.exports = router;
