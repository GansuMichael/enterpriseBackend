const router =
require("express").Router();

const controller =
require("./inventory.controller");

const auth =
require("../../middleware/auth");

router.post("/",auth,controller.createItem);
router.get("/",auth,controller.getItems);
router.put("/:id",auth,controller.updateItem);
router.delete("/:id",auth,controller.deleteItem);

module.exports = router;