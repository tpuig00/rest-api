import { OrderLines } from '../interface/orderLine.interface';
import { getConnection } from '../config/mysql';

export class OrderLinesModel {
    constructor() {
        console.log('OrderLinesModel instance created');
    }

    // Get all order lines for a specific order
    public async getAllByOrderId(orderId: number): Promise<OrderLines[]> {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM OrderLines WHERE order_id = ?', [orderId]);
        connection.release();
        return rows as OrderLines[];
    }

    // Get one order line by ID
    public async getById(id: number): Promise<OrderLines> {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM OrderLines WHERE id = ?', [id]);
        connection.release();
        const [orderLine] = rows as OrderLines[];
        return orderLine;
    }

    // Create a new order line
    public async create(orderLine: OrderLines): Promise<number> {
        const connection = await getConnection();
        try {
            const [result] = await connection.query('INSERT INTO Order_lines SET ?', [orderLine]);

            if (result && 'insertId' in result) {
                return result.insertId;
            } else {
                throw new Error('No se pudo crear la línea de pedido debido a un error en la base de datos.');
            }
        } catch (error) {
            throw new Error(`Error al crear la línea de pedido: ${(error as Error).message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    // Update an order line
    public async update(id: number, orderLine: OrderLines): Promise<void> {
        const connection = await getConnection();
        try {
            const [result] = await connection.query('UPDATE OrderLines SET ? WHERE id = ?', [orderLine, id]);

            if (!(result && 'affectedRows' in result && result.affectedRows > 0)) {
                throw new Error('No se pudo actualizar la línea de pedido debido a un error en la base de datos.');
            }
        } catch (error) {
            throw new Error(`Error al actualizar la línea de pedido: ${(error as Error).message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }

    // Delete an order line
    public async delete(id: number): Promise<void> {
        const connection = await getConnection();
        try {
            const [result] = await connection.query('DELETE FROM OrderLines WHERE id = ?', [id]);

            if (!(result && 'affectedRows' in result && result.affectedRows > 0)) {
                throw new Error('No se pudo eliminar la línea de pedido debido a un error en la base de datos.');
            }
        } catch (error) {
            throw new Error(`Error al eliminar la línea de pedido: ${(error as Error).message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}
