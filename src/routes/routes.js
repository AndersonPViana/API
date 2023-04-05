import { Router } from 'express';
import multer from 'multer';
import uploadCongfig from '../config/upload.js';

import SessionController from '../controllers/SessionController.js';
import HouseController from '../controllers/HouseController.js';
import DashboardController from '../controllers/DashboardController.js';
import ReserveController from '../controllers/ReserveController.js';

const routes = Router();
const upload = multer(uploadCongfig);

// Sessions
routes.post('/sessions', SessionController.store);
routes.delete('/sessions', SessionController.destroy);

// Houses
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.delete('/houses/', HouseController.destroy);
routes.put('/houses/:id', upload.single('thumbnail'), HouseController.update);

// Dashboard
routes.get('/dashboard', DashboardController.show);

// Reserve
routes.post('/houses/:house_id/reserve', ReserveController.store);
routes.get('/reserves', ReserveController.index);
routes.delete('/reserves/cancel', ReserveController.destroy);

export default routes;
