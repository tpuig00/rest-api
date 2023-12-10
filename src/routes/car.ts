import { Router } from 'express';
import { getAllOrders, getAllCars,postOrder, getItem, postCar, updateItem, deleteItem } from '../controllers/item';
import OrderController from '../controllers/orders';

const router = Router();

// Test endpoint
router.get('/test', (req, res) => {
    if(req)console.log('req');
    res.status(200).send('Hello, world!');
});

// Obtener todos las oreders
router.get('/', getAllOrders);

// Crear un nuveo pedido
router.post('/', OrderController.createOrder);

// Obtener un coche específico por ID
router.get('/:id', getItem);

// Actualizar un coche existente
router.put('/:id', updateItem);

// Eliminar un coche
router.delete('/:id', deleteItem);

export { router };
