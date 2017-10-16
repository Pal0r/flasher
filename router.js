const AuthenticationController = require('./controllers/authentication'),
  CardController = require('./controllers/cards'),
  express = require('express');//,
  passportService = require('./config/passport'),
  passport = require('passport');
//
// // Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // Initializing route groups
  app.use(passport.initialize());
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    cardRoutes = express.Router(),
    protectedRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
  apiRoutes.use('/protected', protectedRoutes);
  apiRoutes.use('/cards', cardRoutes);

  // Protected Route
  protectedRoutes.get(
    "/isprotected",
    requireAuth,
    AuthenticationController.protected
  );

  // Card Routes
  cardRoutes.get('/all', requireAuth, CardController.getAll);
  cardRoutes.get('/card/:card_id', requireAuth, CardController.get);
  cardRoutes.get('/subject/:subject', requireAuth, CardController.filter);
  cardRoutes.post('/create', requireAuth, CardController.create);
  cardRoutes.delete('/remove/:card_id', requireAuth, CardController.delete);
  cardRoutes.put('/edit/:card_id', requireAuth, CardController.edit);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

// Set url for API group routes
  app.use('/api', apiRoutes);
};

