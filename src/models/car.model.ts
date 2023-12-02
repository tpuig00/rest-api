import { Car } from '../interface/car.interface';
import { getConnection } from '../config/mysql';

export class CarModel {
    // Obtener todos los coches
    public async getAll(): Promise<Car[]> {
        console.info('entra a getAll')
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Car');
        console.info('CONEXION');
        console.info(rows);
        connection.release();
        return rows as Car[];
        // return rows as Car[];
    }

    // Obtener un coche por ID
    public async getById(id: number): Promise<Car> {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Car WHERE id = ?', [id]);
        connection.release();
        const [car] = rows as Car[];
        return car;
    }

    // Crear un nuevo coche
    public async create(car: Car): Promise<number> {
        const connection = await getConnection();
        const [result] = await connection.query('INSERT INTO Car SET ?', [car]);
        connection.release();
        // Suponiendo que `result` es lo que obtienes de tu consulta a la base de datos
        if ('insertId' in result) {
            // Devolver el insertId si está presente en el resultado
            return result.insertId;
        } else {
            // Aquí podrías lanzar un error o manejar el caso de alguna otra forma
            throw new Error('No se pudo obtener el insertId del resultado de la inserción.');
        }
    }


    // Actualizar un coche
    public async update(id: number, car: Car): Promise<void> {
        const connection = await getConnection();
        await connection.query('UPDATE Car SET ? WHERE id = ?', [car, id]);
        connection.release();
    }

    // Eliminar un coche
    public async delete(id: number): Promise<void> {
        const connection = await getConnection();
        await connection.query('DELETE FROM Car WHERE id = ?', [id]);
        connection.release();
    }
}
