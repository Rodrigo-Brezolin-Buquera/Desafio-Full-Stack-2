import { CustomError } from "../error/customError";
import { Authenticator } from "./Authenticator";


export class TokenService {
  private auth = new Authenticator()

  public verifyUserPermission = async (
    token: string
  ): Promise<any | undefined> => {
    try {
      return this.auth.getData(token);
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  public verifyAdminPermission = async (token: string): Promise<void> => {
    try {
      const { role } = this.auth.getData(token);
     
      const notAdmin = role !== "admin"
      if (notAdmin) {
        throw new CustomError("O usuário não tem as permissões necessárias", 403);
      }
    } catch (error) {
      this.jwtErrorFilter(error as Error);
    }
  };

  private jwtErrorFilter = (error: Error): void => {
    switch (error.message) {
      case "id-token-expired":
        throw new CustomError("Token expirado, faça login novamente", 403);
      case "id-token-revoked":
        throw new CustomError("Token inválido, verifique a requisição", 403);
      default:
        throw new CustomError("O usuário não tem as permissões necessárias", 403);
    }
  };
}

export default TokenService;
