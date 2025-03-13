import { Sequelize } from "sequelize";


export class BaseDatabase {
  protected static connection = new Sequelize(
    "meu_banco", 
    "usuario", 
    "senha", 
    {
      host: "localhost",
      port:  3306, 
      dialect: "mysql", 
      logging: false, 
    }
  );

  public static getConnection() {
    if (!this.connection) {
      throw new Error("Conexão com o banco de dados não foi inicializada.");
    }
    return this.connection;
  }

  public static async testConnection() {
    try {
      await this.connection.authenticate();
      console.log("Conexão com o banco de dados bem-sucedida!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
    }
  }
}  
