const { Measurement } = require('../models/index');

class MeasurementController {
  static async viewAllMeasurement (req, res, next) {
    try {
      const measurement = await Measurement.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
      res.status(200).json(measurement);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MeasurementController;