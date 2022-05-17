const MeasurementController = require('../controllers/measurementController');

const measurementRouter = require('express').Router();

// *Available API*
measurementRouter.get('/', MeasurementController.viewAllMeasurement);

module.exports = measurementRouter;