import express from 'express';

import {
  registerClient, loginClient, addProductToCart, removeProductToCart, getUserCart,
} from '../controllers/users.controllers.js';
import { exitSession, updateSession } from '../controllers/session.controller.js';
import { getCatalog, createProduct, getProduct } from '../controllers/product.controllers.js';

import validateToken from '../middlewares/auth.middlewares.js';
import {
  validateAddToCart,
  validateBodyRegister,
  validateLogin,
  validateNewRegister,
  validateRemoveToCart,
} from '../middlewares/user.middlewares.js';
import { productsValidation, validateGetProduct } from '../middlewares/products.middlewares.js';

const routes = express.Router();

// public routes

const validateRegister = [validateBodyRegister, validateNewRegister];

routes.post('/sign-up', validateRegister, registerClient);

routes.post('/sign-in', validateLogin, loginClient);

routes.get('/products', getCatalog);

routes.get('/product/:id', validateGetProduct, getProduct);

routes.post('/create', productsValidation, createProduct);

// private routes

routes.use(validateToken);

routes.delete('/session', exitSession);

routes.put('/session', updateSession);

routes.delete('/cart/:id', validateRemoveToCart, removeProductToCart);

routes.put('/cart/:id', validateAddToCart, addProductToCart);

routes.get('/cart', validateToken, getUserCart);

export default routes;
