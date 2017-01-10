import { Router } from 'express';
import DefaultController from '../controllers/default.controller.js';

let defaultRoute = (app) => {
	let route = Router();
	let defaultController = new DefaultController(app);

	router.get('/', defaultController.getDefault);
	app.use(router);
};

export default defaultRoute;