import { CustomError } from "../../../common/error/customError";
import { TransactionDatabase } from "../database/transaction.database";
import { ITrasaction, TrasactionDBDTO } from "../DTOs/transactionDTOs";

export class TransactionBusiness {
  private transactionDatabase = new TransactionDatabase();

  public async getUserTransactions(cpf: string): Promise<ITrasaction[]> {
    if (!cpf) {
      throw new CustomError("Usuário não encontrado", 404);
    }
    return await this.transactionDatabase.getUserTransactions(cpf);
  }

  public async getAllTransactions(): Promise<ITrasaction[]> {
    const res = await this.transactionDatabase.getAllTransactions();
    const transactions = res.map((trans) => trans.dataValues);
    return transactions;
  }

  public async createTransaction(input: TrasactionDBDTO): Promise<void> {
    const { cpf, description, value } = input;

    if (
      !cpf ||
      !description 
    ) {
      throw new CustomError("Todos os campos são obrigatórios.", 400);
    }
    if (typeof cpf !== "string") {
      throw new CustomError("CPF deve ser uma string.", 400);
    }
    if (typeof description !== "string") {
      throw new CustomError("Descrição deve ser uma string.", 400);
    }

    if (typeof value !== "number") {
      throw new CustomError("Valor da transação deve ser um número.", 400);
    }

    if (cpf.length !== 11 && cpf.length !== 14) {
      throw new CustomError(
        "CPF deve ter 11 dígitos ou 14 caracteres (com pontuação).",
        400
      );
    }
   
    if (value < 0) {
      throw new CustomError("Valor da transação não pode ser negativo.", 400);
    }

    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Mês é base 0, então adicionamos 1
    const dd = String(date.getDate()).padStart(2, "0");

    const output: TrasactionDBDTO = {
      ...input,
      status: "Em avaliação",
      transaction_date: new Date(`${yyyy}-${mm}-${dd}`),
      point_value: value
    };

    await this.transactionDatabase.createTransaction(output);
  }
}
