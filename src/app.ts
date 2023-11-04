import "dotenv/config";
import express from 'express';
import cors from 'cors';
import db from './config/mysql';
import { router } from './routes';

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.use(db);

app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});