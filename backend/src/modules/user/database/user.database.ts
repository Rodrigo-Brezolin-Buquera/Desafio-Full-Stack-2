import { BaseDatabase } from "../../../database/config";

import { User } from "../../../database/models/User";

type UserType = InstanceType<typeof User>;

type UserDBDTO = { email: string; password: string; cpf:string; name: string; role: string }


export class UserDatabase extends BaseDatabase {
  
  public async createUser(input: UserDBDTO): Promise<void> {
    await User.create(input);
  }

  public async findUsers(): Promise<UserType[]> {
    return await User.findAll();
  }

  public async findUserbyEmail(email: string): Promise<UserType | null> {
    return await User.findOne({ where: { email } });
  }

  public async findUser(cpf: string): Promise<UserType | null> {
    return await User.findOne({ where: { cpf } });
  }

}
