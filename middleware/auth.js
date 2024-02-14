import jwt from "jsonwebtoken";
import { usercheck } from "../models/usercheck.js";

const auth = async (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECRET_KEY);
    const tokencheck = await usercheck.findOne({
      where: {
        token,
        expired: "no",
      },
    });
    if (tokencheck) {
      next();
    } else {
      response.status(401).send({ msg: "login expired" });
    }
  } catch (error) {
    response.status(401).send({ msg: error.message });
  }
};

export { auth };
