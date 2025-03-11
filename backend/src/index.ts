import express from "express"
import "express-async-errors";
import cors from "cors"
import { AddressInfo } from "net"
import { BaseDatabase } from "./database/config"
import { syncDatabase } from "./database/sync";


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


(async () => {
  await BaseDatabase.testConnection();
  await syncDatabase()
})();