import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  // Asosiy ma'lumotlar
  body: {
    type: String,
    required: [true, 'Kuzov turini kiriting'],
    trim: true,
    enum: ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Wagon', 'Pickup', 'Van', 'Minivan', 'Convertible']
  },
  condition: {
    type: String,
    required: [true, 'Holati haqida malumot kiriting'],
    enum: ['New', 'Used', 'Certified Pre-Owned']
  },
  mileage: {
    type: Number,
    required: [true, 'Probeg malumotini kiriting'],
    min: 0
  },
  engineSize: {
    type: Number,
    required: [true, 'Dvigatel hajmini kiriting']
  },
  fuelType: {
    type: String,
    required: [true, 'Yoqilgi turini kiriting'],
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Gas']
  },
  door: {
    type: String,
    required: [true, 'Eshiklar sonini kiriting']
  },
  year: {
    type: Number,
    required: [true, 'Ishlab chiqarilgan yilini kiriting'],
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  cylinder: {
    type: Number,
    required: [true, 'Silindrlar sonini kiriting']
  },
  transmission: {
    type: String,
    required: [true, 'Transmission turini kiriting'],
    enum: ['Automatic', 'Manual', 'Semi-Automatic', 'CVT']
  },
  color: {
    type: String,
    required: [true, 'Rangini kiriting']
  },
  driveType: {
    type: String,
    required: [true, 'Haydash turini kiriting'],
    enum: ['Front-Wheel Drive', 'Rear-Wheel Drive', 'All-Wheel Drive (AWD/4WD)', '4x4']
  },
  vin: {
    type: String,
    required: [true, 'VIN raqamini kiriting'],
    unique: true,
    trim: true
  },

  // Tasviriy ma'lumotlar
  description: {
    type: String,
    required: [true, 'Avtomobil haqida tavsilotlarni kiriting'],
    trim: true
  },

  // Mashina xarakteristikasi 
  length: {
    type: String,
    required: [true, 'Avtomobil uzunligini kiriting'],
    trim: true
  },
  height: {
    type: String,
    required: [true, 'Avtomobil balandligini kiriting'],
    trim: true
  },
  width: {
    type: String,
    required: [true, 'Avtomobil kengligini kiriting'],
    trim: true
  },
  weight: {
    type: Number,
    required: [true, 'Avtomobil umumiy ogirligini kiriting'],
    trim: true
  },
  maxweight: {
    type: Number,
    required: [true, 'Maksimal yuklanish ogirligini kiriting'],
    trim: true
  },
  seats: {
    type: Number,
    required: [true, 'Orindiqlar sonini kiriting'],
    trim: true
  },

  // Benzin and Mator 
  fuelConsumption: {
    type: Number,
    required: [true, '100 km da ichida yoqilgi sarfini kiriting']
  },
  fuelRange: {
    type: Number,
    required: [true, 'Toliq bak bilan maksimal masofani kiriting']
  },

  // 5 ta rasm uchun maydonlar
  images: {
    main: {
      type: String,
      required: [true, 'Asosiy rasmni kiriting']
    },
    front: {
      type: String
    },
    rear: {
      type: String
    },
    interior: {
      type: String
    },
    additional: {
      type: String
    }
  },
  // Lokatsiya 
  location: {
    address: {
      type: String,
      required: [true, 'Avtomobil manzilini kiriting'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Shaharni kiriting'],
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      required: [true, 'Davlatni kiriting'],
      trim: true
    },
    coordinates: {
      longitude: {
        type: Number,
        required: [true, 'Geografik uzunlikni kiriting']
      },
      latitude: {
        type: Number,
        required: [true, 'Geografik kenglikni kiriting']
      }
    },
    mapUrl: {
      type: String,
      trim: true
    }
  },
  showOnMap: {
    type: Boolean,
    default: true
  },
  directionsAvailable: {
    type: Boolean,
    default: true
  },

  // Qo'shimcha ma'lumotlar
  price: {
    type: Number,
    required: [true, 'Narxni kiriting']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Rasmlar uchun validatsiya
carSchema.pre('validate', function (next) {
  if (!this.images || !this.images.main) {
    this.invalidate('images.main', 'Kamida bitta asosiy rasm kiritish shart');
  }
  next();
});

const Car = mongoose.model('Car', carSchema);

export default Car;