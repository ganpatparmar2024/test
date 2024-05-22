// const express = require('express');
import express, { Request, Response } from "express"
const router = express.Router();

router.get(
  '/',
  (req:Request, res:Response) => {
    res.render('union_of_all.ejs')
  }
);

export{router}
