const router = require("express").Router()
const controller = require("./orderController");

router.post("/", controller.createOrder);
router.put("/", controller.updateOrder);
router.get("/", controller.getAllOrders);
router.delete("/", controller.deleteOrder);

module.exports = router;