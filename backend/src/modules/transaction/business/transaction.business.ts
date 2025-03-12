import { CustomError } from "../../../common/error/customError"
import { TransactionDatabase } from "../database/transaction.database"
import { ITrasaction, TrasactionDBDTO } from "../DTOs/transactionDTOs"

export class TransactionBusiness {
  private transactionDatabase = new TransactionDatabase()

  public async getUserTransactions(cpf: string): Promise<ITrasaction[]> {
    if (!cpf) {
      throw new CustomError("Usuário não encontrado", 404)
    }
    return await this.transactionDatabase.getUserTransactions(cpf) 
  }

  public async getAllTransactions(): Promise<ITrasaction[]> {
    const res = await this.transactionDatabase.getAllTransactions()
    const transactions = res.map(trans => trans.dataValues);
    return transactions
  }

  public async createTransaction(input: TrasactionDBDTO): Promise<void> {
    const { cpf, description, transaction_date, point_value, value, status } =
    input;

    if (!cpf || !description || !transaction_date || point_value === undefined || value === undefined || !status) {
      throw new CustomError("Todos os campos são obrigatórios.", 400);
    }
    if (typeof cpf !== "string") {
      throw new CustomError("CPF deve ser uma string.", 400);
    }
    if (typeof description !== "string") {
      throw new CustomError("Descrição deve ser uma string.", 400);
    }
    if (!(transaction_date instanceof Date)) {
      throw new CustomError("Data da transação deve ser uma instância de Date.", 400);
    }
    if (typeof point_value !== "number") {
      throw new CustomError("Valor do ponto deve ser um número.", 400);
    }
    if (typeof value !== "number") {
      throw new CustomError("Valor da transação deve ser um número.", 400);
    }
    if (typeof status !== "string") {
      throw new CustomError("Status deve ser uma string.", 400);
    }
    if (cpf.length !== 11 && cpf.length !== 14) {
      throw new CustomError("CPF deve ter 11 dígitos ou 14 caracteres (com pontuação).", 400);
    }
    if (point_value < 0) {
      throw new CustomError("Valor do ponto não pode ser negativo.", 400);
    }
    if (value < 0) {
      throw new CustomError("Valor da transação não pode ser negativo.", 400);
    }
    if (!["Aprovado", "Reprovado", "Em avaliação"].includes(status)) {
      throw new CustomError("Status deve ser 'Aprovado', 'Reprovado' ou 'Em avaliação'.", 400);
    }
    const currentDate = new Date();
    if (transaction_date > currentDate) {
      throw new CustomError("Data da transação não pode ser no futuro.", 400);
    }
    await this.transactionDatabase.createTransaction(input)
  }
}