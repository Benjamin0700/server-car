import Car from '../models/carModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// Barcha avtomobillarni olish
export const getAllCars = catchAsync(async (req, res, next) => {
  // Filtrlash imkoniyati
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Kengaytirilgan filtrlash (gt, gte, lt, lte)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
  
  let query = Car.find(JSON.parse(queryStr));

  // Saralash
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Maydonlarni cheklash
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Sahifalash
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Natijani bajarish
  const cars = await query;

  res.status(200).json({
    status: 'success',
    results: cars.length,
    data: {
      cars
    }
  });
});

// Bitta avtomobilni olish
export const getCar = catchAsync(async (req, res, next) => {
  const car = await Car.findById(req.params.id);

  if (!car) {
    return next(new AppError('Bu ID ga ega avtomobil topilmadi', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      car
    }
  });
});

// Yangi avtomobil yaratish
export const createCar = catchAsync(async (req, res, next) => {
  const newCar = await Car.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      car: newCar
    }
  });
});

// Avtomobil ma'lumotlarini yangilash
export const updateCar = catchAsync(async (req, res, next) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!car) {
    return next(new AppError('Bu ID ga ega avtomobil topilmadi', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      car
    }
  });
});

// Avtomobilni o'chirish
export const deleteCar = catchAsync(async (req, res, next) => {
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    return next(new AppError('Bu ID ga ega avtomobil topilmadi', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Statistikani olish
export const getCarStats = catchAsync(async (req, res, next) => {
  const stats = await Car.aggregate([
    {
      $match: { mileage: { $gte: 0 } }
    },
    {
      $group: {
        _id: { $toUpper: '$body' },
        numCars: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        avgMileage: { $avg: '$mileage' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

// Avtomobillar filtri (maxsus so'rovlar)
export const getCarsByFilter = catchAsync(async (req, res, next) => {
  const { body, condition, year, fuelType, transmission, driveType } = req.query;
  
  const filter = {};
  
  if (body) filter.body = body;
  if (condition) filter.condition = condition;
  if (year) filter.year = year;
  if (fuelType) filter.fuelType = fuelType;
  if (transmission) filter.transmission = transmission;
  if (driveType) filter.driveType = driveType;
  
  const cars = await Car.find(filter);
  
  res.status(200).json({
    status: 'success',
    results: cars.length,
    data: {
      cars
    }
  });
});