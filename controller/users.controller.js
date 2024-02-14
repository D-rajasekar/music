import { Register } from "../models/users.model.js";
import usersServices from "../services/users.services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { request } from "express";
import { usercheck } from "../models/usercheck.js";

async function genHashPassword(userPassword) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(userPassword, salt);
  console.log(hashedPassword);
  return hashedPassword;
}
async function getUserData(request, response) {
  const userData = usersServices.getUserService();
  response.send(await userData);
}
async function createUser(request, response) {
  console.log(request.body);
  const { username, password } = request.body;
  if (password.length <= 8) {
    response.status(400).send({
      msg: "password should be more than 8 charcters",
    });
  } else {
    const hashedPassword = await genHashPassword(password);
    console.log(hashedPassword);
    response.send(
      await usersServices.createUsersquery({
        username,
        password: hashedPassword,
      })
    );
  }
}

async function loginUser(request, response) {
  const { username, password } = request.body;
  const UserFromDB = await usersServices.getUserByName(username);
  console.log(UserFromDB);

  if (!UserFromDB) {
    response.status(401).send({ msg: "Invalid request" });
  } else {
    const ispasswordcheck = await bcrypt.compare(password, UserFromDB.password);
    if (ispasswordcheck) {
      const token = jwt.sign({ id: UserFromDB.id }, process.env.SECRET_KEY);
      usersServices.createSessionFunction(UserFromDB.id, token);
      response.send({ msg: "login successful", token });
    }
  }
}

//upload to cloud
async function userPic(request, response) {
  console.log(request.body);

  cloudinary.config({
    secure: true,
  });

  const uploadImage = async (imagePath) => {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(cloudinary.config());
  (async () => {
    const imagePath = request.file.path;
    const publicId = await uploadImage(imagePath);
    response.send({ msg: "uploaded", url: publicId.secure_url });
    var tokenKey = request.header("x-auth-token");
    console.log("***************", tokenKey);
    const id = await usersServices.findIdByToken(tokenKey);
    await usersServices.updateAvatar(publicId.secure_url, id.userid);
  })();
}

async function logout(request, response) {
  const token_key = request.header("x-auth-token");
  console.log(token_key);
  const id = await usersServices.findIdByToken(token_key);
  await usersServices.updateExpiry(id.userid);
  response.send("token expired");
}

export default { createUser, loginUser, getUserData, userPic, logout };
