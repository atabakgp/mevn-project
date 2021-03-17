const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); 

const corsOptions = {
  credentials: true,
  origin: true
}
const app = express();
app.use(cors(corsOptions));

const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes');


// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cookieParser());
app.use('/user', authRouter);
app.use('/user', profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;