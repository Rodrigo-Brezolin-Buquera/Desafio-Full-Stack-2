import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customError";

export const errorMiddlewWare = (
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  console.log(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Erro desconhecido no servidor",
  });
};
