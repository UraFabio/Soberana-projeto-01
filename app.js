const express = require('express');
const morgan = require('morgan');

const agendaRouter = require('./routes/agendaRoutes');
// const userRouter = require('./routes/userRoutes');

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

app.use('/api/v1/agendas', agendaRouter);
// app.use('/api/v1/users', userRouter);

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

module.exports = app;
