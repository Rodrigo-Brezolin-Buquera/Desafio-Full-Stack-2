import  { Request, Response } from "express";
import { UserBusiness } from "../business/user.business";

export class UserController {
    private userBusiness = new UserBusiness()

  public async login(req: Request, res: Response): Promise<void> {
    const email = req.body.email
    const password = req.body.password
    const token = await this.userBusiness.login({email, password});
    res.status(200).send({token});
  }

  public async signup(req: Request, res: Response): Promise<void> {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const cpf = req.body.cpf
    const token = await this.userBusiness.signup({email, password, name, cpf});
    res.status(201).send({token, message: "Conta criada com sucesso" });
  }

  public async findUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    const result = await this.userBusiness.findUser(id);
    res.status(200).send(result);
  }

  public async findUsers(req: Request, res: Response): Promise<void> {
    const result = await this.userBusiness.findUsers();
    res.status(200).send(result);
  }



 
}
