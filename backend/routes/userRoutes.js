const { Router } = require("express");

const router = Router();

const { registerUser, LoginUser, getUser } = require('../controllers/userControllers');

const { protect } = require('../middleware/authMiddleware')


router.post('/api/users/', registerUser)
router.post('/api/users/login', LoginUser)
router.get('/api/users/me', protect, getUser)


module.exports = router;