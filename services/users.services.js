import { Register } from "../models/users.model.js";
import { usercheck } from "../models/usercheck.js";

async function createUsersquery({ username, password }) {
  try {
    return await Register.create({ username, password });
  } catch (error) {
    return { msg: error.errors.map((ele) => ele.message).join() };
  }
}

async function getUserByName(username) {
  return await Register.findOne({
    where: {
      username,
    },
  });
}

async function getUserService() {
  return await Register.findAll();
}

async function createSessionFunction(userid, token) {
  return await usercheck.create({ userid, token });
}

async function updateAvatar(url, userID) {
  return await Register.update(
    { avatar: url },
    {
      where: {
        id: userID,
      },
    }
  );
}
async function findIdByToken(tokenKey) {
  return await usercheck.findOne({
    where: {
      token: tokenKey,
    },
  });
}

async function updateExpiry(id) {
  return await usercheck.update({ expired: "yes" }, { where: { userid: id } });
}
export default {
  createUsersquery,
  getUserByName,
  getUserService,
  createSessionFunction,
  updateAvatar,
  findIdByToken,
  updateExpiry,
};
