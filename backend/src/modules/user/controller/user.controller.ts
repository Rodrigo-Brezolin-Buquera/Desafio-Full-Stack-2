import { Request, Response } from "express";
import { UserBusiness } from "../business/user.business";

export class UserController {
    private userBusiness = new UserBusiness()

  public async login(req: Request, res: Response): Promise<void> {
    const result = await this.userBusiness.login();
    res.status(200).send("result");
  }

  public async signup(req: Request, res: Response): Promise<void> {
    await this.userBusiness.signup();
    res.status(201).send({ message: "Conta criada com sucesso" });
  }

  public async findUser(req: Request, res: Response): Promise<void> {
    const result = await this.userBusiness.findUser();
    res.status(200).send("result");
  }

  public async findUsers(req: Request, res: Response): Promise<void> {
    const result = await this.userBusiness.findUsers();
    res.status(200).send("result");
  }



 
}
