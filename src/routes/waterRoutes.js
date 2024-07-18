const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const waterController = require('../controllers/waterController');

router.post('/add', authMiddleware, waterController.addWater);
router.put('/update/:id', authMiddleware, waterController.updateWater);
router.delete('/delete/:id', authMiddleware, waterController.deleteWater);

module.exports = router;
