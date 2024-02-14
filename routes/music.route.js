import express from "express";
import musicController from "../controller/music.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router
  .route("/")
  .get(auth, musicController.getAllmusic)
  .post(auth, musicController.createMusic);

router
  .route("/:id")
  .get(auth, musicController.getMusicByID)
  .delete(auth, musicController.deleteMusicByID)
  .put(auth, musicController.updateMusicByID);

export default router;
