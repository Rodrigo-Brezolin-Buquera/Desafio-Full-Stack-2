import { UserDatabase } from "../database/user.database"

export class UserBusiness {
  private userDatabase = new UserDatabase()

  public async login(): Promise<void> {
    const result = await this.userDatabase.login();
  }

  public async signup(): Promise<void> {

    await this.userDatabase.createUser();
  }

  public async findUsers(): Promise<void> {
    const result = await this.userDatabase.findUsers();
  }

  public async findUser(): Promise<void> {
    const result = await this.userDatabase.findUser();
  }


 
}