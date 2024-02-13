import express from "express";
import musicController from "../controller/music.controller.js";
const router = express.Router();
router
  .route("/")
  .get(musicController.getAllmusic)
  .post(musicController.createMusic);

router
  .route("/:id")
  .get(musicController.getMusicByID)
  .delete(musicController.deleteMusicByID)
  .put(musicController.updateMusicByID);

export default router;
