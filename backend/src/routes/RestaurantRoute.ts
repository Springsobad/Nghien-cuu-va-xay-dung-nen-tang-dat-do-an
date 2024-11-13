
import express  from 'express';
import { param } from 'express-validator';
import RestaurantController from '../controller/RestaurantController';
const router = express.Router();
router.get("/search/:city", param("city").isString().trim().notEmpty().withMessage("City parament must be a valid string"), RestaurantController.searchRestaurant)