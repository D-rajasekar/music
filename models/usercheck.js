import { DataTypes } from "sequelize";
import { sequelize } from "../config.js";
import { Register } from "./users.model.js";

const usercheck = sequelize.define(
  "usercheck",
  {
    // Model attributes are defined here
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiry: {
      type: DataTypes.STRING,
      defaultValue: "no",
    },
  },
  {
    // Other model options go here
  }
);

Register.hasMany(usercheck, { onDelete: "cascade", hooks: true });
Register.hasMany(usercheck, { foreignKey: "user_id" });
usercheck.belongsTo(Register, { foreignKey: "user_id" });
console.log(usercheck === sequelize.models.usercheck); // true
export { usercheck };
