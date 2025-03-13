import { CustomError } from "../../../common/error/customError";
import { Authenticator } from "../../../common/services/Authenticator";
import { UserDatabase } from "../database/user.database";
import { CredentialsDTO, IUser, UserDTO } from "../DTOs/userDtos";

export class UserBusiness {
  private userDatabase = new UserDatabase();
  private auth = new Authenticator();

  public async login(credentials: CredentialsDTO): Promise<string> {
    const { email, password } = credentials;
    const user = (await this.userDatabase.findUserbyEmail(email)) as IUser;

    if (!user) {
      throw new CustomError("Email ou senha inválidos, tente novavamente", 404);
    }

    if (password !== user!.password) {
      throw new CustomError("Email ou senha inválidos, tente novavamente", 404);
    }

    const token = this.auth.generateToken({ id: user.cpf, role: user.role });
    return token;
  }

  public async signup(userDTO: UserDTO): Promise<string> {
    const { email, password, cpf, name } = userDTO;

    if (!cpf || !email || !password || !name) {
      throw new CustomError("Todos os campos são obrigatórios.", 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError("E-mail inválido.", 406);
    }

    const passwordRegex =  /^\d{6,}$/;
    if (!passwordRegex.test(password)) {
      throw new CustomError(
        "Senha inválida. Deve conter pelo menos 6 caracteres",
        406
      );
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(cpf)) {
      throw new CustomError("CPF inválido. Use o formato XXX.XXX.XXX-XX.", 406);
    }

    if (!name) {
      throw new CustomError("Insira uma nome de usuário", 406);
    }

    const newUser = { email, password, cpf, name, role: "user" };

    await this.userDatabase.createUser(newUser);
    const token = this.auth.generateToken({
      id: newUser.cpf,
      role: newUser.role,
    });
    return token;
  }

  public async findUsers(): Promise<IUser[]> {
    const res = await this.userDatabase.findUsers();
    const users = res.map(user => user.dataValues);
    return users
  }

  public async findUser(id: string): Promise<IUser> {
    const user = (await this.userDatabase.findUser(id)) as IUser;
    if (!user) {
      throw new CustomError("Usuário não encontrado", 404);
    }
    return user;
  }
}
