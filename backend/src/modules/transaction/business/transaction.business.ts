import { TransactionDatabase } from "../database/transaction.database"

export class TransactionBusiness {
  private transactionDatabase = new TransactionDatabase()

  public async getUserTransactions(): Promise<void> {
    await this.transactionDatabase.getUserTransactions()
  }

  public async getAllTransactions(): Promise<void> {
    await this.transactionDatabase.getAllTransactions()

  }

  public async createTransaction(): Promise<void> {
    await this.transactionDatabase.createTransaction()
  }

 
}