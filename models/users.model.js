import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";

const Register = sequelize.define(
  "Register",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    avatar:{
      type:DataTypes.STRING,
    }
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
//console.log(Signup === sequelize.models.Signup); // true
export { Register };
