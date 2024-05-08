const router = require("express").Router();
const { getTotalBalance ,updateTotalBalance} = require("../controllers/totalBalanceController");
const { varifyToken } = require("../middleware/varifyToken");

router.route("/").get(varifyToken, getTotalBalance).put(varifyToken, updateTotalBalance);

module.exports = router;
