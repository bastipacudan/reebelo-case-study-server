const router = require('express').Router();

router.use("/product", require("./product"));
router.use("/order", require("./order"));

module.exports = router;