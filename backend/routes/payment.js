const express = require('express');
const db = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { validatePayment } = require('../middleware/validation');
const { sendPaymentNotification } = require('../services/emailService');

const router = express.Router();

// Process payment
router.post('/', authenticateToken, validatePayment, async (req, res) => {
  try {
    const { agents, plan, total, cardDetails } = req.body;
    const userId = req.user.id;

    // Validate agents exist
    const agentResults = await db.query(`
      SELECT id, name, price FROM agents WHERE id IN (${agents.map(() => '?').join(',')})
    `, agents);

    if (agentResults.length !== agents.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more agents not found'
      });
    }

    // Validate plan exists
    const planResults = await db.query('SELECT id, name, price FROM pricing_plans WHERE id = ?', [plan]);
    if (planResults.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Pricing plan not found'
      });
    }

    // Calculate server-side total to prevent manipulation
    const agentTotal = agentResults.reduce((sum, agent) => sum + parseFloat(agent.price), 0);
    const planTotal = parseFloat(planResults[0].price);
    const serverTotal = agentTotal + planTotal;

    // Verify total matches
    if (Math.abs(serverTotal - total) > 0.01) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount mismatch'
      });
    }

    // Simulate payment processing (replace with actual payment gateway)
    const paymentResult = await processPayment(cardDetails, serverTotal);
    
    if (!paymentResult.success) {
      return res.status(400).json({
        success: false,
        message: paymentResult.message
      });
    }

    // Save payment record
    await db.query(`
      INSERT INTO payments (user_id, plan_id, agent_ids, amount, status, payment_method, transaction_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      userId,
      plan,
      JSON.stringify(agents),
      serverTotal,
      'completed',
      'card',
      paymentResult.transactionId
    ]);

    // Send notification email to admin
    try {
      await sendPaymentNotification({
        user: req.user,
        agents: agentResults,
        plan: planResults[0],
        amount: serverTotal,
        transactionId: paymentResult.transactionId
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the payment if email fails
    }

    res.json({
      success: true,
      message: 'Payment processed successfully',
      transactionId: paymentResult.transactionId
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment processing failed'
    });
  }
});

// Get payment history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const payments = await db.query(`
      SELECT p.id, p.amount, p.status, p.created_at, p.transaction_id,
             pl.name as plan_name, p.agent_ids
      FROM payments p
      JOIN pricing_plans pl ON p.plan_id = pl.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `, [req.user.id]);

    res.json(payments);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment history'
    });
  }
});

// Simulate payment processing (replace with actual payment gateway)
async function processPayment(cardDetails, amount) {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Basic card validation
  if (!cardDetails.cardNumber || cardDetails.cardNumber.length !== 16) {
    return { success: false, message: 'Invalid card number' };
  }

  if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
    return { success: false, message: 'Invalid CVV' };
  }

  // Simulate payment success
  return {
    success: true,
    transactionId: 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  };
}

module.exports = router;