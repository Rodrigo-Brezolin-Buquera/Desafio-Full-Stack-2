import { BaseDatabase } from "./config";
import { User } from "./models/User";
import { Transaction } from "./models/Transaction";

export async function syncDatabase() {
  try {
    await BaseDatabase.getConnection().sync({ force: true }); 

    await User.bulkCreate([
      { cpf: "282.279.300-00", name: "Admin", email: "admin@email.com", password: "senha123", role: "admin" },
      { cpf: "123.456.789-00", name: "João Silva", email: "joao@email.com", password: "senha456", role: "usuario" },
      { cpf: "432.54.222-00", name: "Maria clara", email: "Maria@email.com", password: "senha456", role: "usuario" },
    ]);

    await Transaction.bulkCreate([
      { cpf: "123.456.789-00", description: "Venda de X", transaction_date: new Date("2022-10-10"), point_value: 10000, value: 10000.00, status: "Aprovado" },
      { cpf: "123.456.789-00", description: "Venda da Y", transaction_date: new Date("2022-10-10"), point_value: 833, value: 833.00, status: "Reprovado" },
      { cpf: "123.456.789-00", description: "Venda do Z", transaction_date: new Date("2022-10-10"), point_value: 10000, value: 10000.00, status: "Em avaliação" },
      { cpf: "432.54.222-00", description: "Venda do AA", transaction_date: new Date("2022-10-10"), point_value: 500, value: 500.00, status: "Reprovado" },
      { cpf: "432.54.222-00", description: "Venda do BB", transaction_date: new Date("2022-10-10"), point_value: 100, value: 100.00, status: "Em avaliação" }
    ]);

    console.log("Banco sincronizado e dados inseridos!");
  } catch (error) {
    console.error("Erro ao sincronizar banco:", error);
  } 
}

