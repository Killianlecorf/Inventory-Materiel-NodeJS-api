import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import databaseConnection from "./src/Config/DBconnect";
import materialsRoute from "./src/Routes/Materials.routes"
import { corsMiddleware } from "./src/middleware/cors.middleware";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
      "http://localhost:5173"
  ],
  credentials: true
}));


app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(cors());

app.use('/api/materials', materialsRoute);

databaseConnection()

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});