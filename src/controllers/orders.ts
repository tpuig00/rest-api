
import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const orderData = req.body;
            console.info('entra al controller')
            let result = await OrderService.processNewOrder(orderData);
            if (result) {
                res.status(201).json({ id: result });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new OrderController();
