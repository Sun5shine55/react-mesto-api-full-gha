const router = require('express').Router();
const { celebrate, errors, Joi } = require('celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/^(https?:\/\/)(www\.)?[a-z0-9-._~:/?#[\]@!$&()*+,;=]{1,256}\.[a-z]{2,6}\b([a-z0-9-._~:/?#[\]@!$&()*+,;=]*)/i),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
router.use(auth);
router.use('/', auth, userRoutes);
router.use('/', auth, cardRoutes);
router.all('*', (next) => {
  const error = new NotFoundError('Указан неправильный маршрут');
  next(error);
});
router.use(errors());

module.exports = router;
