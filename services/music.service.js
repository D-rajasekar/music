import { Music } from "../models/music.model.js";

async function getAllmusicQuery(dbQuery) {
  return await Music.findAll(dbQuery);
}

async function getmusicIDQuery(id) {
  return await Music.findOne({
    where: {
      id: id,
    },
  });
}

async function createMusicQuery(ans) {
  return await Music.create(ans);
}

async function deleteMusicByID(id) {
  return await Music.destroy({
    where: {
      id: id,
    },
  });
}

async function updateMusicByIDQuery(ans, id) {
  return await Music.update(ans, {
    where: {
      id: id,
    },
  });
}

export default {
  getAllmusicQuery,
  getmusicIDQuery,
  createMusicQuery,
  deleteMusicByID,
  updateMusicByIDQuery,
};
