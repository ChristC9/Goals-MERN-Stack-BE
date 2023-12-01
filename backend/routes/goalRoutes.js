const { Router } = require("express");

const router = Router();

const { setGoals, getGoals, updateGoals, deleteGoals } = require("../controllers/goalControllers");

const { protect } = require('../middleware/authMiddleware')

router.route('/api/goals/').post(protect, setGoals).get(protect, getGoals);
router.route('/api/goals/:id').put(protect, updateGoals).delete(protect, deleteGoals);

module.exports = router;