import express from "express";
import { sequelize } from "./config.js";
import { Music } from "./models/music.model.js";
import musicRouter from "./routes/music.route.js";
import Usersrouter from "./routes/users.route.js";
import cors from "cors";
import morgan from "morgan";

try {
  await sequelize.authenticate();
  await sequelize.sync();
  app.use(morgan("tiny"));
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
// const album1 = await Music.create({
//   title: "Senyoreeta",
//   artist: "U1",
//   releaseDate: 2011,
//   duration: 331,
//   genre: "Love",
//   previewURL: "https://youtu.be/10RnRpMj9Mg?si=dBxnalt2bq5PiqHU",
//   popularity: 90,
// });

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;

// app.get("/", function (request, response) {
//   response.send("🙋‍♂️, 🌏 🎊✨🤩 ");
// });
app.use("/music", musicRouter);
app.use("/users", Usersrouter);

//   app.get("/music", getAllmusic());

// app.get("/music/:id", createMusic());

//app.post("/music", createMusic());

//app.delete("/music/:id", deleteMusicByID());

//app.put("/music/:id", updateMusicByID());

// app.get("/musics", async function (request, response) {
//     var ans = request.query;
//     console.log(ans);
//     var getAllAlbum = await Music.findAll({ order: [["releaseDate", "DESC"]] });
//     response.send(getAllAlbum);
//   });

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
