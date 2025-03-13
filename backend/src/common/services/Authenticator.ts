
import * as jwt from "jsonwebtoken";


export interface AuthenticationData {
    id: string;
    role: string;
  } 

export class Authenticator {

   public generateToken(input:AuthenticationData): string {
       
        const token = jwt.sign(
           input,
            "chave-em-plain-text",
            { expiresIn: "3h" }
        )
        return token
    }

   public getData(token: string): AuthenticationData {
        const payload = jwt.verify(token, "chave-em-plain-text") as any
        const result: AuthenticationData = { id: payload.id, role: payload.role }
        return result
    }
}