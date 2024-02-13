import express from "express";
import musicController from "../controller/music.controller.js";
const router = express.Router();
router
  .route("/")
  .get(musicController.getAllmusic)
  .post(musicController.createMusic)
  .get(musicController.getMusicByID);
router
  .route("/:id")
  .delete(musicController.deleteMusicByID)
  .put(musicController.updateMusicByID);

export default router;
