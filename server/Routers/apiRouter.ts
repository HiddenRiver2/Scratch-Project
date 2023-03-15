import {Request, Response, NextFunction} from 'express';
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController.ts');


//http://localhost:3000/api/createUser
router.post('/createUser', userController.createUser, (req: Request, res: Response, next: NextFunction) => res.status(200).json(res.locals.user));

//http://localhost:3000/api/verifyUser
router.post('/verifyUser', userController.verifyUser, (req: Request, res: Response, next: NextFunction) => res.json(res.locals.userid));

//http://localhost:3000/api/funds
//router.get('/funds', userController.getFunds, (req: Request, res: Response, next: NextFunction) => res.json(res.locals.funds));

//http://localhost:3000/api/funds
//router.post('/funds', userController.updateFunds, (req: Request, res: Response, next: NextFunction) => res.json(res.locals.funds));

module.exports = router;