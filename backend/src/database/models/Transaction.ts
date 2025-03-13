import { DataTypes } from "sequelize";
import { BaseDatabase } from "../config";
import { User } from "./User";

export const Transaction = BaseDatabase.getConnection().define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      references: {
        model: User, 
        key: "cpf", 
      },
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    point_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Aprovado", "Reprovado", "Em avaliação"),
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    timestamps: false,
  }
);

Transaction.belongsTo(User, { foreignKey: "cpf" });
User.hasMany(Transaction, { foreignKey: "cpf" });
