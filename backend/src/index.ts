import express from "express"
import "express-async-errors";
import cors from "cors"
import { AddressInfo } from "net"
import { BaseDatabase } from "./database/config"
import { syncDatabase } from "./database/sync";
import { UserController } from "./modules/user/controller/user.controller";
import { TransactionController } from "./modules/transaction/controller/transaction.controller";
import { errorMiddlewWare } from "./common/error/errorMiddleware";


export const app = express()
app.use(express.json())
app.use(cors())

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error("Failure upon starting server.");
  }
})

app.get('/', (req, res) => {
    res.send('Backend Express ok!');
});

const userController = new UserController()

// adicionar midlewares de rota

app.get('/user', (req, res) => userController.findUsers(req, res));
app.get('/user/:id', (req, res) => userController.findUser(req, res));

app.post('/login', (req, res) => userController.login(req, res));
app.post('/signup', (req, res) => userController.signup(req, res));

const transactionController = new TransactionController()

app.get('/transaction', (req, res) => transactionController.getAllTransactions(req, res));
app.get('/transaction/:id', (req, res) => transactionController.getUserTransactions(req, res));
app.post('/transaction', (req, res) => transactionController.createTransaction(req, res));


app.use(errorMiddlewWare);



(async () => {
  await BaseDatabase.testConnection();
  await syncDatabase()
})();