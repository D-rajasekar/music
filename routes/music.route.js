import express from "express";
import musicController from "../controller/music.controller.js";
const router = express.Router();
router
  .route("/")
  .get(musicController.getAllmusic)
  .get(musicController.getMusicByID);
router
  .route("/:id")
  .post(musicController.createMusic)
  .delete(musicController.deleteMusicByID)
  .put(musicController.updateMusicByID);

export default router;
