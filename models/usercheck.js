import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const usercheck = sequelize.define(
  "usercheck",
  {
    // Model attributes are defined here
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expired: {
      type: DataTypes.STRING,
      defaultValue: "no",
    },
  },
  {
    // Other model options go here
  }
);
//console.log(SignUp === sequelize.models.SignUp); // true
export { usercheck };
