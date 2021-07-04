const router = require('express').Router();
const exerciseRoutes = require('./exerciseRoutes');

router.use('/workouts', exerciseRoutes);

module.exports = router;