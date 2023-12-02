// src/controllers/item.ts
import { Request, Response } from 'express';
import { CarModel } from '../models/car.model';
import { OrdersModel } from '../models/orders.model';

const carModel = new CarModel();

const orderModel = new OrdersModel();

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    console.info('ENTRA PER ENDPOINT')
      const orders = await orderModel.getAll(); // Llama a la función correctamente
      res.json(orders); // Envía los resultados como respuesta JSON
    } catch (error) {
      console.info('FAIL')
      res.status(508).send('fail'); // Maneja los errores correctamente
  }
}

export const getAllCars = async (req: Request, res: Response) => {
    try {
        const cars = await carModel.getAll(); // Llama a la función correctamente
        res.json(cars); // Envía los resultados como respuesta JSON
      } catch (error) {
        console.info('FAIL')
        res.status(500).send('fail'); // Maneja los errores correctamente
    }
};

export const getItem = async (req: Request, res: Response) => {
  // ... lógica para obtener un item por ID
};

export const postOrder = async (req: Request, res: Response) => {
    try {
        const id = await orderModel.create(req.body); // Llama a la función correctamente
        res.json({id}); // Envía el ID como respuesta
    } catch (error) {
        
    }
  // ... lógica para crear un nuevo item
}

export const postCar = async (req: Request, res: Response) => {
    try {
        const id = await carModel.create(req.body); // Llama a la función correctamente
        res.json({id}); // Envía el ID como respuesta
    } catch (error) {
        
    }
  // ... lógica para crear un nuevo item
};

export const updateItem = async (req: Request, res: Response) => {
  // ... lógica para actualizar un item existente
};

export const deleteItem = async (req: Request, res: Response) => {
  // ... lógica para eliminar un item
};
