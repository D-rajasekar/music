import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { role } from "./role.model.js";

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
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
  },
  {
    // Other model options go here
  }
);

Register.belongsTo(role, { foreignKey: "role_id" });
role.hasMany(Register, { foreignKey: "role_id" });
// `sequelize.define` also returns the model
console.log(Register === sequelize.models.Register); // true
export { Register };
