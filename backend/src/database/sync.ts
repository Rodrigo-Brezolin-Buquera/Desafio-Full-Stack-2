import { BaseDatabase } from "./config";
import { User } from "./models/User";
import { Transaction } from "./models/Transaction";

export async function syncDatabase() {
  try {
    await BaseDatabase.getConnection().sync({ force: true }); 

    await User.bulkCreate([
      { cpf: "282.279.300-00", name: "Admin", email: "admin@email.com", password: "senha123", role: "admin" },
      { cpf: "123.456.789-00", name: "João Silva", email: "joao@email.com", password: "senha456", role: "usuario" }
    ]);

    await Transaction.bulkCreate([
      { cpf: "123.456.789-00", description: "Venda do produto X", transaction_date: new Date("2022-10-10"), point_value: 10000, value: 10000.00, status: "Aprovado" },
      { cpf: "123.456.789-00", description: "Venda do produto Y", transaction_date: new Date("2022-10-10"), point_value: 10000, value: 10000.00, status: "Reprovado" },
      { cpf: "123.456.789-00", description: "Venda do produto Z", transaction_date: new Date("2022-10-10"), point_value: 10000, value: 10000.00, status: "Em avaliação" }
    ]);

    console.log("Banco sincronizado e dados inseridos!");
  } catch (error) {
    console.error("Erro ao sincronizar banco:", error);
  } finally {
    await BaseDatabase.getConnection().close();
  }
}

