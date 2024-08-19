const express = require('express');
const morgan = require('morgan');

const agendaRouter = require('./routes/agendaRoutes');
const authRouter = require('./routes/authRoutes');
const uploadRouter = require('./routes/uploadRoutes');
const htmlRouter = require('./routes/htmlRoutes');
const userRouter = require('./routes/userRoutes');

const authController = require('./controllers/authController');

const app = express();

// 1) Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/storage', express.static(`${__dirname}/storage`));
app.use(express.static(`${__dirname}/public`));

// 2) Route handlers

app.use('/', htmlRouter);
app.use('/auth', authRouter);
app.use('/api/v1/agendas', authController.protect, agendaRouter);
app.use('/upload', authController.protect, uploadRouter);
app.use('/user', authController.protect, userRouter);

app.use((req, res, next) => {
  res.sendFile(`${__dirname}/public/404.html`);
});

module.exports = app;
