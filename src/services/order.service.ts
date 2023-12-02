
import { Orders } from '../interface/orders.interface';
import {OrdersModel} from '../models/orders.model';

class OrderService {

    // Función para transformar los datos de entrada para crear un Orders
    private static dataTransformationOrder(orderData: any): Orders {
        // Mapeo de los datos de entrada WC 'mata_key' a los datos del modelo Orders
        const mapping = {
            _customer_user: 'id_customer',
            _billing_email: 'email',
            _billing_phone: 'tlf',
            _shipping_address_index: 'shipping_address_index',
            _order_total: 'total'
        };

        const order: Orders = {
            // Añade el ID del pedido al array
            id:orderData[0]['order_id'],
            // FIXME: Asigno tienda id = 1
            id_tienda:1,
            id_customer: 0,
            nuevo: true,
            email: '',
            tlf: '',
            shipping_address_index: '',
            total: 0
        }

        // Itera sobre el array de datos de entrada y los mapea a los datos del modelo Orders
        orderData.array.forEach((orderDataLineWC: any) => {
            let meta_key = orderDataLineWC['meta_key'];
            let meta_value = orderDataLineWC['meta_value'];
            if (meta_key in mapping) {
                // Utiliza la notación de corchetes para asignar una clave dinámica
                let mappedKey = mapping[meta_key as keyof typeof mapping];
                (order as any)[mappedKey as keyof Orders] = meta_value;
            }
        });

        return order;
    }

    async processNewOrder(orderData: any) {
        try {
            const order = OrderService.dataTransformationOrder(orderData);
            const ordersModelInstance = new OrdersModel();
            const insertedOrder = await ordersModelInstance.create(order);
            // Decide si devolver el objeto completo o solo el ID
            // return insertedOrder; // o return insertedOrder.id;
        } catch (error) {
            throw new Error('No se pudo crear el pedido.');
        }
    }
}

export default new OrderService();
