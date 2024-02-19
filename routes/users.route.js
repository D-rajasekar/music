import { Register } from "../models/users.model.js";
import usersController from "../controller/users.controller.js";
import express from "express";
import { auth } from "../middleware/auth.js";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.filename + "-" + uniqueSuffix + path.extname(file.originalname)
    );
    console.log(file);
  },
});

const upload = multer({ storage });
const router = express.Router();

router.route("/signup").post( usersController.createUser);
router.route("/login").post( usersController.loginUser);
router.route("/logout").post( usersController.logout);

router.route("/").get(auth, usersController.getUserData);
router.route("/:id").delete(auth,usersController.deleteUserDataByID);

router
  .route("/pic")
  .post(auth, upload.single("avatar"), usersController.userPic);

export default router;
