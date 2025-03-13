import { Model } from "sequelize";
import { User } from "../../../database/models/User";

export type CredentialsDTO = { email:string, password: string }

export type UserDTO= { email: string; password: string; name: string; cpf:string }


export type UserType = InstanceType<typeof User>;

export type UserDBDTO = { email: string; password: string; cpf:string; name: string; role: string }

export interface IUser extends Model {
    email: string;
    password: string;
    name: string;
    cpf: string;
    role: string;
  }