var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
const session = require('express-session');
var cors = require('cors');
//var favicon = require('serve-favicon')
const cookieMiddleware = require('./middlewares/cookieMiddleware')
const authAdminMiddleware = require ('./middlewares/adminMiddlewares/authAdminMiddleware');
const createCartMiddleware = require('./middlewares/cartsMiddlewares/createCartMiddleware');


//REQUERIMIENTO DE RUTAS
var mainRouter = require('./routes/mainRoutes');
var usersRouter = require('./routes/usersRoutes');
var adminRouter = require('./routes/admin/adminRoutes');
var productsRouter = require('./routes/productsRoutes');
var cartRouter = require('./routes/cartRoutes');
var apiProductsRoutes = require('./routes/apiRoutes/apiProductsRoutes');
var apiUsersRoutes = require('./routes/apiRoutes/apiUsersRoutes');

var app = express();
app.use(cors());
//app.use(favicon(path.join('public', 'images' , 'logos', 'favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret: 'mensaje oculto', saveUninitialized: true, resave: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(createCartMiddleware); 
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));


//USO DE RUTAS
app.use('/', mainRouter);
app.use('/usuarios', usersRouter);
app.use('/admin', authAdminMiddleware ,adminRouter);
app.use('/productos', productsRouter);
app.use('/carrito', cartRouter);
app.use('/api/products', apiProductsRoutes);
app.use('/api/users', apiUsersRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: 'Error', user: req.sessionuser, admin: req.session.admin});
});

module.exports = app;
