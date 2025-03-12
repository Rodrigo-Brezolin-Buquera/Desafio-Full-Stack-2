import { Request, Response, NextFunction } from "express"
import { CustomError } from "./customError"

export const errorMiddlewWare = (err:any, req: Request, res: Response, _:NextFunction) => {
  console.log(err)
  
  if (err instanceof CustomError) {
    
    res.status(err.code).send(err.message)
  } else {
    res.status(err.statusCode).send(err.message)
  }    
}