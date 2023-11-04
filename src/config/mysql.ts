// src/config/mysql.ts
import mysql from 'mysql2/promise';

const databaseConfig = {
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tu_base_de_datos'
};

const pool = mysql.createPool(databaseConfig);

export const getConnection = async () => {
  return await pool.getConnection();
};
