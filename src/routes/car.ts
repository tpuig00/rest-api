import { Router } from 'express';
import { getAllOrders, getAllCars,postOrder, getItem, postCar, updateItem, deleteItem } from '../controllers/item';

const router = Router();

// Obtener todos las oreder
router.get('/', getAllOrders);

// Obtener un coche específico por ID
router.get('/:id', getItem);

// Crear un nuevo coche
router.post('/', postOrder);

// Actualizar un coche existente
router.put('/:id', updateItem);

// Eliminar un coche
router.delete('/:id', deleteItem);

export { router };
