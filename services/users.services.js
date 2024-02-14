import { Register } from "../models/users.model.js";
import { usercheck } from "../models/usercheck.js";

async function createUsersquery({ username, password }) {
  try {
    return await Register.create({ username, password });
  } catch (error) {
    return { msg: error };
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

async function createSessionFunction(user_id, token) {
  return await usercheck.create({ user_id, token });
}

async function updateAvatar(url, user_id) {
  return await Register.update(
    { avatar: url },
    {
      where: {
        id: user_id,
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
  return await usercheck.update({ expiry: "yes" }, { where: { user_id: id } });
}

////////////////////////////////////////////////////////////////////
async function sessionCheckToken(token) {
  return await usercheck.findOne({
    where: {
      token: token,
      expiry: "no",
    },
  });
}

async function checkingRoleID(user_id) {
  return await Register.findOne({
    where: {
      id: user_id,
    },
  });
}

async function distoryMovieDataByID(id) {
  return await Register.destroy({
    where: {
      id: id,
    },
  });
}

export default {
  createUsersquery,
  getUserByName,
  getUserService,
  createSessionFunction,
  updateAvatar,
  findIdByToken,
  updateExpiry,
  sessionCheckToken,
  checkingRoleID,
  distoryMovieDataByID,
};
