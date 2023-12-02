import "dotenv/config";
import express from 'express';
import cors from 'cors';
import { getConnection } from './config/mysql';
import { router } from './routes';

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

// console.info(app.use(getConnection));
// app.use(async (req, res, next) => {
//   try {
//     const connection = await getConnection();
//     const [rows] = await connection.query('SELECT 1 + 1 AS solution');
//     console.info('rows', rows);
//     connection.release(); // Asegúrate de liberar la conexión
//     next(); // Continúa con el siguiente middleware
//   } catch (error) {
//     console.error('Error connecting to the database', error);
//     next(error); // Pasa el error al manejador de errores
//   }
// });

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});