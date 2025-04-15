const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Oddiy authentication funksiyalari
exports.protect = catchAsync(async (req, res, next) => {
  // Autentifikatsiya logikasi
  // Haqiqiy autentifikatsiya amalga oshirilgunga qadar, shunchaki next() ni chaqiramiz
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Ruxsat berish logikasi
    // Haqiqiy ruxsat berish amalga oshirilgunga qadar, shunchaki next() ni chaqiramiz
    next();
  };
};

// Boshqa autentifikatsiya metodlarini qo'shing