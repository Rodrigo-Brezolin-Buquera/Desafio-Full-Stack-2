import { Model } from "sequelize";
import { Transaction } from "../../../database/models/Transaction";

export type TransactionType = InstanceType<typeof Transaction>;

 export type TrasactionDBDTO = {
    id?: string,
    cpf: string,
    description: string,
    transaction_date: Date,
    point_value: number,
    value: number,
    status: "Aprovado" | "Reprovado" | "Em avaliação"
}


export interface ITrasaction extends Model {
    id: string,
    cpf: string,
    description: string,
    transaction_date: Date,
    point_value: number,
    value: number,
    status: "Aprovado" | "Reprovado" | "Em avaliação"
  }