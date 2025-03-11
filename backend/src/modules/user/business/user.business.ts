import { UserDatabase } from "../database/user.database"


type CredentialsDTO = { email:string, password: string }

type UserDTO= { email: string; password: string; name: string; cpf:string }


export class UserBusiness {
  private userDatabase = new UserDatabase()

  public async login(credentials: CredentialsDTO): Promise<void> {
    const {email, password} = credentials
     await this.userDatabase.findUserbyEmail(email);
  }

  public async signup(userDTO: UserDTO): Promise<void> {
    const { email, password, cpf, name} = userDTO
    const newUser = { email, password, cpf, name, role: "user"}
    await this.userDatabase.createUser(newUser);
  }

  public async findUsers(): Promise<void> {
    const result = await this.userDatabase.findUsers();
  }

  public async findUser(id:string): Promise<void> {
    const result = await this.userDatabase.findUser(id);
  }


 
}