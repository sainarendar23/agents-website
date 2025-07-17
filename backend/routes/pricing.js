const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all pricing plans
router.get('/', authenticateToken, async (req, res) => {
  try {
    const plans = await db.query(`
      SELECT id, name, price, period, description, features, agent_limit
      FROM pricing_plans
      ORDER BY price ASC
    `);

    // Parse JSON features for each plan
    const formattedPlans = plans.map(plan => ({
      ...plan,
      features: JSON.parse(plan.features)
    }));

    res.json(formattedPlans);
  } catch (error) {
    console.error('Get pricing plans error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing plans'
    });
  }
});

// Get pricing plan by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const plans = await db.query(`
      SELECT id, name, price, period, description, features, agent_limit
      FROM pricing_plans
      WHERE id = ?
    `, [id]);

    if (plans.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    const plan = plans[0];
    plan.features = JSON.parse(plan.features);

    res.json(plan);
  } catch (error) {
    console.error('Get pricing plan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pricing plan'
    });
  }
});

module.exports = router;