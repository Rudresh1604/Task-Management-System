const express = require("express");
const upload = require("../Middleware/multer");
const {
  uploadFileController,
  registerController,
  loginController,
  getDetailController,
  addAgentsController,
  getAgentsController,
} = require("../Controllers/userController");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/add-agent", authMiddleware, addAgentsController);
router.get("/get-agents", authMiddleware, getAgentsController);
router.get("/get-detail/:userId", authMiddleware, getDetailController);

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFileController
);

module.exports = router;
