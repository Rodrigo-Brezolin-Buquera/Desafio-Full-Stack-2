import { Request, Response, NextFunction } from "express";
import TokenService from "./tokenService";

const tokenService = new TokenService();

export const userTokenMW = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.headers.authorization as string;
    req.body.tokenPayload = await tokenService.verifyUserPermission(token);
    next();
  
};

export const adminTokenMW =  async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.headers.authorization as string;
    await tokenService.verifyAdminPermission(token);
    next();
};
