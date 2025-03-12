import { Request, Response } from "express";
import { TransactionBusiness } from "../business/transaction.business";

export class TransactionController {
  private transactionBusiness = new TransactionBusiness();

  public async getUserTransactions(req: Request, res: Response): Promise<void> {
    const cpf = req.params.id;
    const result = await this.transactionBusiness.getUserTransactions(cpf);
    res.status(200).send(result);
  }

  public async getAllTransactions(req: Request, res: Response): Promise<void> {
    const result = await this.transactionBusiness.getAllTransactions();
    res.status(200).send(result);
  }

  public async createTransaction(req: Request, res: Response): Promise<void> {
    const { description, point_value, value } =req.body;

    const transactionInput = {
      cpf: req.params.id ,
      description,
      point_value,
      value,
    };

    await this.transactionBusiness.createTransaction(transactionInput);
    res.status(201).send({ message: "Transação criada com sucesso" });
  }
}
