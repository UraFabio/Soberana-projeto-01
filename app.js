const express = require('express');
const morgan = require('morgan');

const agendaRouter = require('./routes/agendaRoutes');
const authRouter = require('./routes/authRoutes');
const uploadRouter = require('./routes/uploadRoutes');

const authController = require('./controllers/authController');

const app = express();

// 1) Middlewares
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) Route handlers

app.use('/api/v1/agendas', authController.protect, agendaRouter);
app.use('/api/v1/login', authRouter);
app.use('/api/v1/upload', authController.protect, uploadRouter);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;
