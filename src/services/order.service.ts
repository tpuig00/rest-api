
import { OrderLines } from '../interface/orderLine.interface';
import { Orders } from '../interface/orders.interface';
import { OrderLinesModel } from '../models/orderLines.model';
import {OrdersModel} from '../models/orders.model';

class OrderService {

    // Función para transformar los datos de entrada para crear un Orders
    private static dataTransformationOrder(orderData: any): Orders {
        const order: Orders = {
            // Añade el ID del pedido al array
            id:orderData['order_id'],
            // FIXME: Asigno tienda id = 1
            id_tienda:1,
            id_customer: 0,
            nuevo: true,
            email: orderData['billing']['email'],
            tlf: orderData['billing']['phone'],
            shipping_address_index: orderData['shipping']['address_1'] + ' ' + orderData['shipping']['address_2'] + ' ' + orderData['shipping']['city'] + ' ' + orderData['shipping']['state'] + ' ' + orderData['shipping']['postcode'] + ' ' + orderData['shipping']['country'],
            total: orderData['order_total'],
        }
        return order;
    }

    // Función para transformar los datos de los productos de entrada para crear OrderLines
    private static dataTransformationOrderLines(orderData: any): Array<OrderLines> {
        const orderLines: Array<any> = [];
        orderData['line_items'].forEach((item: any) => {
            const orderLine: OrderLines = {
                order_id: orderData['order_id'],
                sku: item['sku']??'',
                qt: item['quantity'],
                attributes: null,
            }
            if (item['meta_data'] && item['meta_data'].length > 0) {
                // Tiene metadatos (atributos)
                let attributes: { name: string, value: any }[] = [];
                item['meta_data'].forEach((meta: any) => {
                    let attribute = {
                        name: meta['key'],
                        value: meta['value'],
                    }
                    attributes.push(attribute);
                });
                orderLine['attributes'] = attributes;
            }
            orderLines.push(orderLine);
        });
        return orderLines;
    }

    async processNewOrder(orderData: any) {
        console.info('entra al service')
        try {
            const order = OrderService.dataTransformationOrder(orderData);
            const ordersModelInstance = new OrdersModel();
            const insertedOrder = await ordersModelInstance.create(order);
            // At this point we have already inserted the order in the database
            const orderLines = OrderService.dataTransformationOrderLines(orderData);
            const orderLinesModelInstance = new OrderLinesModel();
            orderLines.forEach(async (orderLine: OrderLines) => {
                try {
                    await orderLinesModelInstance.create(orderLine);
                } catch (error) {
                    throw new Error('No se pudo crear la línea de pedido.' + (error as Error).message);
                }
            } );
            return insertedOrder;
        } catch (error) {
            throw new Error('No se pudo crear el pedido.' + (error as Error).message);
        }
    }
}

export default new OrderService();
