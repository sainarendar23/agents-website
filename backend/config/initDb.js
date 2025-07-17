const db = require('./database');

const initializeDatabase = async () => {
  try {
    // Create users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create agents table
    await db.query(`
      CREATE TABLE IF NOT EXISTS agents (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        features JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create pricing_plans table
    await db.query(`
      CREATE TABLE IF NOT EXISTS pricing_plans (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        period VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        features JSON NOT NULL,
        agent_limit INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create payments table
    await db.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        user_id VARCHAR(36) NOT NULL,
        plan_id VARCHAR(36) NOT NULL,
        agent_ids JSON NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        status VARCHAR(50) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
      )
    `);

    // Insert default agents
    const agents = [
      {
        name: 'Email Marketing Agent',
        description: 'Automate email campaigns, lead nurturing, and customer communication with advanced AI-powered personalization.',
        price: 29.00,
        category: 'Marketing',
        features: JSON.stringify(['Campaign automation', 'Lead scoring', 'A/B testing', 'Analytics', 'Personalization'])
      },
      {
        name: 'Social Media Agent',
        description: 'Manage posts, engagement, and social media analytics across multiple platforms with intelligent content creation.',
        price: 39.00,
        category: 'Marketing',
        features: JSON.stringify(['Post scheduling', 'Engagement tracking', 'Hashtag optimization', 'Analytics', 'Content creation'])
      },
      {
        name: 'Customer Support Agent',
        description: 'Handle customer inquiries, tickets, and support documentation with 24/7 AI-powered assistance.',
        price: 49.00,
        category: 'Support',
        features: JSON.stringify(['24/7 chat support', 'Ticket management', 'Knowledge base', 'Escalation', 'Multi-language'])
      },
      {
        name: 'Data Analysis Agent',
        description: 'Process data, generate reports, and provide actionable insights with advanced analytics and visualization.',
        price: 59.00,
        category: 'Analytics',
        features: JSON.stringify(['Data processing', 'Report generation', 'Trend analysis', 'Visualization', 'Predictive analytics'])
      },
      {
        name: 'Sales Automation Agent',
        description: 'Streamline sales processes, lead qualification, and follow-up communications with intelligent CRM integration.',
        price: 69.00,
        category: 'Sales',
        features: JSON.stringify(['Lead qualification', 'Follow-up automation', 'CRM integration', 'Pipeline management', 'Sales forecasting'])
      },
      {
        name: 'Content Creation Agent',
        description: 'Generate high-quality content, blog posts, and marketing materials with AI-powered writing assistance.',
        price: 45.00,
        category: 'Content',
        features: JSON.stringify(['Content generation', 'SEO optimization', 'Blog writing', 'Social media content', 'Brand consistency'])
      }
    ];

    for (const agent of agents) {
      await db.query(`
        INSERT IGNORE INTO agents (name, description, price, category, features)
        VALUES (?, ?, ?, ?, ?)
      `, [agent.name, agent.description, agent.price, agent.category, agent.features]);
    }

    // Insert default pricing plans
    const pricingPlans = [
      {
        name: 'Free',
        price: 0.00,
        period: 'forever',
        description: 'Perfect for trying out SOM AI',
        features: JSON.stringify(['1 AI Agent', 'Basic automation', 'Community support', '5 workflows/month']),
        agent_limit: 1
      },
      {
        name: 'Monthly',
        price: 99.00,
        period: 'per month',
        description: 'Great for growing businesses',
        features: JSON.stringify(['Up to 5 AI Agents', 'Advanced automation', 'Priority support', 'Unlimited workflows', 'Custom integrations']),
        agent_limit: 5
      },
      {
        name: 'Yearly',
        price: 999.00,
        period: 'per year',
        description: 'Best value for established teams',
        features: JSON.stringify(['Unlimited AI Agents', 'Enterprise automation', '24/7 phone support', 'Custom workflows', 'Advanced analytics', 'Team collaboration']),
        agent_limit: -1
      }
    ];

    for (const plan of pricingPlans) {
      await db.query(`
        INSERT IGNORE INTO pricing_plans (name, price, period, description, features, agent_limit)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [plan.name, plan.price, plan.period, plan.description, plan.features, plan.agent_limit]);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

module.exports = initializeDatabase;