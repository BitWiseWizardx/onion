const { getAuthUsers } = require("../controllers/authUserController");
const { varifyToken } = require("../middleware/varifyToken");

const router = require("express").Router();

router.route("/").get(varifyToken, getAuthUsers);

module.exports = router;
