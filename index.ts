import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import databaseConnection from "./src/Config/DBconnect";
import materialsRoute from "./src/Routes/Materials.routes"
import { corsMiddleware } from "./src/middleware/cors.middleware";
import EmailRoute from './src/Routes/Mail.routes'
import LendMaterialsRoute from './src/Routes/LendMaterials.routes'

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({
//   origin: [
//       "http://localhost:5173",
//       "http://localhost:8080",
//       "http://vps-3aa18acd.vps.ovh.net:8080/",
//       "http://vps-3aa18acd.vps.ovh.net/"
//   ],
//   credentials: true
// }));


app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(cors());

app.use('/api/materials', materialsRoute);
app.use('/api/service', EmailRoute);
app.use('/api/lend', LendMaterialsRoute);

databaseConnection()

if (process.env.NODE_ENV?.trim() !== 'test') {
  app.listen(port, () => {
    console.log(`Le serveur est en écoute sur le port ${port}`);
  }); 
}

export { app };