import mysql from 'mysql2/promise';

const databaseConfig = {
  host: 'db',
  user: 'root',
  password: 'mi_contraseña',
  database: 'mi_base_de_datos',
  port: 3306
};

const pool = mysql.createPool(databaseConfig);

export const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida con éxito.');
    connection.release(); // No olvides liberar la conexión
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Vuelve a lanzar el error para que el llamador pueda manejarlo
  }
};
