
import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const orderData = req.body;
            await OrderService.processNewOrder(orderData);
            res.status(201).json('HOLIIII');
        } catch (error) {
            res.status(400).json({ error: 'FAILLL' });
        }
    }
}

export default new OrderController();
