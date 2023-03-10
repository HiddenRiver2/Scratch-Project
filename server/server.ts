import express, {Request, Response, NextFunction, RequestHandler} from 'express';
const userController = require('./Controllers/userController');
const app = express();
const path = require('path');


app.get('/api', userController.createUser, (req, res, next) => res.json(res.locals.user));
app.post('/api', userController.verifyUser, (req, res, next) => res.json(res.locals.user));
app.get('/api', userController.getFunds, (req, res, next) => res.json(res.locals.funds));
app.post('/api', userController.updateFunds, (req, res, next) => res.json(res.locals.funds));

if (process.env.NODE_ENV === 'production') {

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

};


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(3000, () => console.log('Listening on port 3000'));