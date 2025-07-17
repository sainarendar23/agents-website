const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all agents
router.get('/', authenticateToken, async (req, res) => {
  try {
    const agents = await db.query(`
      SELECT id, name, description, price, category, features
      FROM agents
      ORDER BY category, name
    `);

    // Parse JSON features for each agent
    const formattedAgents = agents.map(agent => ({
      ...agent,
      features: JSON.parse(agent.features)
    }));

    res.json(formattedAgents);
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch agents'
    });
  }
});

// Get agent by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const agents = await db.query(`
      SELECT id, name, description, price, category, features
      FROM agents
      WHERE id = ?
    `, [id]);

    if (agents.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    const agent = agents[0];
    agent.features = JSON.parse(agent.features);

    res.json(agent);
  } catch (error) {
    console.error('Get agent error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch agent'
    });
  }
});

// Get agents by category
router.get('/category/:category', authenticateToken, async (req, res) => {
  try {
    const { category } = req.params;
    
    const agents = await db.query(`
      SELECT id, name, description, price, category, features
      FROM agents
      WHERE category = ?
      ORDER BY name
    `, [category]);

    const formattedAgents = agents.map(agent => ({
      ...agent,
      features: JSON.parse(agent.features)
    }));

    res.json(formattedAgents);
  } catch (error) {
    console.error('Get agents by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch agents'
    });
  }
});

module.exports = router;