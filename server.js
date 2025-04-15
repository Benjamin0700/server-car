import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import carRoutes from './routes/carRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/cars', carRoutes);

// MongoDB Atlas ga ulanish
// MongoDB Atlas ga ulanish
mongoose.connect('mongodb+srv://jalolsoxiddinov777:4AZ4tbeNUjuTkLCL@cluster.dqa55z5.mongodb.net/', {
  serverSelectionTimeoutMS: 30000,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000
  // useNewUrlParser va useUnifiedTopology opsiyalarini olib tashlang, chunki ular endi eskirgan
})
  .then(() => console.log('MongoDB ga muvaffaqiyatli ulandi'))
  .catch(err => console.error('MongoDB ulanish xatosi:', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});