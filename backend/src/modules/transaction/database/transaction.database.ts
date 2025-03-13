import { BaseDatabase } from "../../../database/config";
import { Transaction } from "../../../database/models/Transaction";
import { ITrasaction, TransactionType, TrasactionDBDTO } from "../DTOs/transactionDTOs";

export class TransactionDatabase extends BaseDatabase {
  
  public async getUserTransactions(cpf: string): Promise<ITrasaction[]> {
    return await Transaction.findAll({ where: { cpf } })  as ITrasaction[]
  }

  public async getAllTransactions(): Promise<ITrasaction[]> {
    return await Transaction.findAll() as ITrasaction[]
  }

  public async createTransaction( transaction: TrasactionDBDTO ): Promise<void> {
    await Transaction.create(transaction);
  }
}
