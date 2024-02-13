import {Register } from "../models/users.model.js";

async function createUsersquery({username, password}) {
  try {

    return await Register.create({ username, password });
  } catch (error) {
    return { msg: error.errors.map((ele) => ele.message).join() };
  }
}

async function getUserByName(username){
  return await Register.findOne({
      where:{
          username,
      }
  })
}

async function getUserService(){
  return await Register.findAll();
}


export default { createUsersquery,getUserByName,getUserService };
