import express from 'express';
import Car from '../models/carModel.js';
import * as carController from '../controllers/carController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Statistika va filtrlash marshrutlari
router.route('/stats').get(carController.getCarStats);
router.route('/filter').get(carController.getCarsByFilter);

// Asosiy CRUD marshrutlari
router
  .route('/')
  .get(carController.getAllCars)
  .post(
    authController.protect, 
    authController.restrictTo('admin', 'seller'),
    carController.createCar
  );

// Bitta mashinani olish, yangilash va o'chirish
router
  .route('/:id')
  .get(carController.getCar)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'seller'),
    carController.updateCar
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    carController.deleteCar
  );

// Eski marshrutlar (alternativ sifatida qoldirilgan)
// Barcha mashinalarni olish - modelni to'g'ridan-to'g'ri ishlatib
router.get('/simple', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Yangi mashina qo'shish - modelni to'g'ridan-to'g'ri ishlatib
router.post('/simple', async (req, res) => {
  try {
    const car = new Car(req.body);
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error('Error creating car:', error);  // Konsolga xatolikni chiqaring
    res.status(500).json({ message: error.message });
  }
});

export default router;