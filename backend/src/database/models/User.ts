import { DataTypes } from "sequelize";
import { BaseDatabase } from "../config";

export const User = BaseDatabase.getConnection().define(
  "User",
  {
    cpf: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "usuario"),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
