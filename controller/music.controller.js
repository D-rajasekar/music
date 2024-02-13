import { Music } from "../models/music.model.js";
import musicService from "../services/music.service.js";

async function getAllmusic(request, response) {
  var querys = request.query;
  const page = querys?.page || 1;
  const limit = querys?.limit || 5;
  let dbQuery = {};
  // console.log(querys);
  if (querys.orderBy && querys.order) {
    dbQuery.order = [[querys.orderBy, querys.order]];
  }
  if ("page" in querys || "limit" in querys) {
    dbQuery.offset = (page - 1) * limit;
    dbQuery.limit = limit;
  }
  var result = await musicService.getAllmusicQuery(dbQuery);
  response.send(result);
}

async function getMusicByID(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  var getAlbumByID = await musicService.getmusicIDQuery(id);
  response.send(getAlbumByID);
}

async function createMusic(request, response) {
  // console.log(request.body);
  var ans = request.body;

  var createAlbum = await musicService.createMusicQuery(ans);

  // response.send(insertedValue);
  response.send(createAlbum);
}

async function deleteMusicByID(request, response) {
  //   console.log(request.params.id);
  const { id } = request.params;
  const msg = { msg: "not found" };
  var deleteAlbumByID = await musicService.deleteMusicByID(id);
  deleteAlbumByID
    ? response.send({ msg: "successfully deleted", deleteAlbumByID })
    : response.status(404).send(msg);
}

async function updateMusicByID(request, response) {
  // console.log(request.body);
  const { id } = request.params;
  const ans = request.body;
  const msg = { msg: "not found" };
  var updateAlbumByID = await musicService.updateMusicByIDQuery(ans, id);
  updateAlbumByID
    ? response.send(updateAlbumByID)
    : response.status(404).send(msg);
}

export default {
  getAllmusic,
  getMusicByID,
  createMusic,
  deleteMusicByID,
  updateMusicByID,
};
