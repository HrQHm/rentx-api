import multer from 'multer';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarsImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';
import uploadConfig from '@config/upload';

const carRoutes = Router();
const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const createCarsSpecifications = new CreateCarSpecificationController();
const listAvailableCarController = new ListAvailableCarsController();
const uploadCarsImageController = new UploadCarsImageController();

carRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carRoutes.get('/available', listAvailableCarController.handle);
carRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarsSpecifications.handle);
carRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarsImageController.handle);
export { carRoutes };