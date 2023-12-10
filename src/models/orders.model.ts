import { Orders } from '../interface/orders.interface';
import { OrderLines } from '../interface/orderLine.interface';
import { getConnection } from '../config/mysql';

export class OrdersModel {

    constructor() {
        // Inicialización o configuración
        // (async () => {
        //     try {
        //         let rows = await this.getAll();
        //         console.info(rows);
        //     } catch (error) {
        //         console.error('Error al obtener todos los pedidos:', error);
        //     }
        // })();
        
        console.log('OrdersModel instance created');
    }

    // Get all orders
    public async getAll(): Promise<Orders[]> {
        console.info('entra a getAll Order');
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Orders');
        console.info('CONEXION');
        connection.release();
        return rows as Orders[];
    }

    // Get one order by ID
    public async getById(id: number): Promise<Orders> {
        const connection = await getConnection();
        const [rows] = await connection.query('SELECT * FROM Orders WHERE id = ?', [id]);
        connection.release();
        const [order] = rows as Orders[];
        return order;
    }

    // Create a new order
    public async create(order: Orders): Promise<number> {   
        const connection = await getConnection();
        try {
            console.info('Entry at create order');
            const [result] = await connection.query('INSERT INTO Orders SET ?', [order]);

            if (result && 'affectedRows' in result && result.affectedRows > 0){
                return order.id;
            } else {
                throw new Error('No se pudo crear la orden debido a un error en la base de datos.');
            }
        } catch (error) {
            throw new Error(`Error al crear la orden: ${(error as Error).message}`);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
    
    public static getNeededColumns(): Array<string> {
        return ['id','id_tienda', 'id_customer', 'nuevo', 'email', 'tlf', 'shipping_address_index', 'total'];
    }

}