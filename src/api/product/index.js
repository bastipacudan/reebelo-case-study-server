const router = require("express").Router()
const controller = require("./productController");

router.post("/", controller.createProduct);
router.put("/", controller.updateProduct);
router.get("/", controller.getAllProducts);
router.delete("/", controller.deleteProduct);
module.exports = router;