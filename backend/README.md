# SOM AI Backend

A complete Node.js/Express backend for the SOM AI automation platform.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: MySQL with connection pooling and prepared statements
- **Security**: Helmet, CORS, rate limiting, input validation
- **Payment Processing**: Secure payment handling with server-side validation
- **Email Notifications**: Automated admin notifications for purchases
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Input validation using Joi

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `GET /auth/verify` - Token verification

### Agents
- `GET /api/agents` - Get all available agents
- `GET /api/agents/:id` - Get agent by ID
- `GET /api/agents/category/:category` - Get agents by category

### Pricing
- `GET /api/pricing` - Get all pricing plans
- `GET /api/pricing/:id` - Get pricing plan by ID

### Payment
- `POST /api/payment` - Process payment
- `GET /api/payment/history` - Get payment history

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd gflow-ai/backend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   - Create MySQL database named `som_ai`
   - Update database credentials in `.env`
   - Tables will be created automatically on first run

4. **Start Server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=som_ai

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@gflow.ai

# Payment (if using Stripe)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Database Schema

### Users
- `id` - UUID primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Bcrypt hashed password
- `created_at` - Registration timestamp
- `updated_at` - Last update timestamp

### Agents
- `id` - UUID primary key
- `name` - Agent name
- `description` - Agent description
- `price` - Monthly price
- `category` - Agent category
- `features` - JSON array of features
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Pricing Plans
- `id` - UUID primary key
- `name` - Plan name
- `price` - Plan price
- `period` - Billing period
- `description` - Plan description
- `features` - JSON array of features
- `agent_limit` - Maximum agents allowed
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Payments
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `plan_id` - Foreign key to pricing_plans
- `agent_ids` - JSON array of selected agent IDs
- `amount` - Payment amount
- `currency` - Payment currency
- `status` - Payment status
- `payment_method` - Payment method used
- `transaction_id` - External transaction ID
- `created_at` - Payment timestamp
- `updated_at` - Last update timestamp

## Security Features

- **Authentication**: JWT tokens with expiration
- **Password Security**: Bcrypt hashing with salt rounds
- **Input Validation**: Joi schema validation
- **Rate Limiting**: Protect against abuse
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **SQL Injection Protection**: Prepared statements
- **XSS Protection**: Input sanitization

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Payment Processing

The current implementation includes a payment simulation. For production:

1. **Stripe Integration**: Uncomment Stripe code and configure
2. **Webhook Handling**: Set up webhook endpoints
3. **Payment Verification**: Implement payment status verification
4. **Refund Processing**: Add refund capabilities

## Email Notifications

Automated emails are sent for:
- Purchase notifications to admin
- Welcome emails to new users
- Payment confirmations

Configure SMTP settings in `.env` for email functionality.

## Monitoring

- **Health Check**: `GET /health` endpoint
- **Logging**: Morgan HTTP request logging
- **Error Tracking**: Comprehensive error logging

## Testing

```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use process manager (PM2)
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure database connection pooling
6. Set up monitoring and logging
7. Configure backup strategies

## Support

For technical support or questions, contact admin@gflow.ai