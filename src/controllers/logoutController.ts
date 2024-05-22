import { NextFunction, Request, Response } from "express";

export const logout = (req:Request, res:Response, next:NextFunction)=>{
    res.clearCookie("jwt");
      res.redirect('/api/login');
}