import {Request, Response, NextFunction, RequestHandler} from 'express';
const User = require('../Model/dbModel.ts');

const userController = {

    createUser: (req: Request, res: Response, next: NextFunction) => {
    console.log("Made it into createUser");
    console.log('req.body is', req.body);
    const { username, password } = req.body;
    const funds = 100;
    const text = 'INSERT INTO users (username, password, funds) VALUES ($1, $2, $3) RETURNING userID';
    const values = [username, password, funds];
    User.query(text, values)
      .then((dbData: any) => {
        //we want to type this data later on
        // console.log("RESPONSE", dbData);
        res.locals.user = dbData.rows[0].userid;
        return next();
      })
      .catch((err: String) => {
        return next({
          status: 404,
          err: err,
          message: {
            err: 'Error with request to make new user, please review input fields',
          }, 
        });
      });
    },

    verifyUser: (req: Request, res: Response, next: NextFunction) => {
      console.log("Made it into verifyUser");
      const { username, password } = req.body;
      const text = 'SELECT password, userid FROM users WHERE username = $1';
      const values = [username];
      User.query(text, values)
        .then((response: any) => {
          //no encrypting currently, just checks for a match of username and password, look at later if time allows
          if (response.rows[0].password === password) {
            res.locals.userid = response.rows[0].userid;
            console.log('success!');
          }
          if (!res.locals.userid) {
            console.log('Username or password are incorrect!');
            res.locals.userid = null; //if password/username doesn't work, set ID to null
          }
         return next();
        })
        .catch((err: String) => {
          next({
            status: 404,
            err: err,
            message: {
              err: 'Error with request to login, please review input fields',
            },
          });
        });
    }
};


    




    // getFunds (req: Request, res: Response, next: NextFunction) {
    //     console.log(req.body);
    // },

    // updateFunds (req: Request, res: Response, next: NextFunction) {
    //     console.log(req.body);
    // }



module.exports = userController;