import { Request, Response } from "express";
import { TransactionBusiness } from "../business/transaction.business";

export class TransactionController {
  private transactionBusiness = new TransactionBusiness();

  public async getUserTransactions(req: Request, res: Response): Promise<void> {
    await this.transactionBusiness.getUserTransactions();
    res.status(200).send("result");
  }

  public async getAllTransactions(req: Request, res: Response): Promise<void> {
    await this.transactionBusiness.getAllTransactions();
    res.status(200).send("result");
  }

  public async createTransaction(req: Request, res: Response): Promise<void> {
    await this.transactionBusiness.createTransaction();
    res.status(201).send("result");
  }
}
