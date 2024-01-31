const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/users", require("./users"));
router.use("/tasks", require("./tasks"));
router.use("/goals", require("./goals"));


module.exports = router;
