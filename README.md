Empowering businesses to deploy intelligent AI agents for seamless workflow automation.

🚀 Key Features
🖥 Frontend (React + Tailwind CSS)
Modern Landing Page – Professional hero section, feature highlights, agent showcase, pricing, and testimonials

JWT-Based Authentication – Secure and fully integrated login/registration system

Interactive Dashboard – Agent selection, plan comparison, subscription tracking

Payment Gateway Integration – Stripe-ready, secure, and validated checkout

Responsive UI – Mobile-first design with polished, accessible components

🔧 Backend (Node.js + Express + MySQL)
RESTful API – Comprehensive set of endpoints for authentication, agent data, pricing, and transactions

Custom JWT Auth – Secure token-based user verification

MySQL Database – Robust relational schema with user, agent, and payment entities

Transactional Email Support – Real-time email notifications using Nodemailer

Enterprise Security – Built-in protection including CORS, rate limiting, input validation, and more

🗂 Project Structure
bash
Copy
Edit
gflow-ai/
├── frontend/           # React + Tailwind frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application routes & pages
│   │   ├── contexts/   # React context providers (e.g., Auth)
│   │   ├── services/   # API integration (Axios)
│   │   └── index.css   # Tailwind styles
│   └── package.json
├── backend/            # Node.js + Express API
│   ├── config/         # DB config, environment variables
│   ├── middleware/     # Auth, validation, error handlers
│   ├── routes/         # API route controllers
│   ├── services/       # External services (email, payment)
│   └── package.json
└── README.md
🧰 Tech Stack
Layer	Technology
Frontend	React 18, Tailwind CSS, Axios
Backend	Node.js, Express.js, MySQL
Auth	JWT (Custom implementation), Bcrypt
Payments	Stripe Integration
Email	Nodemailer (SMTP)
Security	Helmet, Joi, Rate Limiting, CORS

⚙️ Quick Start Guide
📌 Prerequisites
Node.js v16+

MySQL v8+

npm or yarn

🔙 Backend Setup
bash
Copy
Edit
cd gflow-ai/backend
npm install
cp .env.example .env
Edit .env with your credentials:

env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=som_ai
JWT_SECRET=your_super_secret_jwt_key
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@gflow.ai
Create the database:

sql
Copy
Edit
CREATE DATABASE som_ai;
Run the server:

bash
Copy
Edit
npm run dev
🔜 Frontend Setup
bash
Copy
Edit
cd gflow-ai/frontend
npm install
npm run dev
Open the app in your browser:
👉 http://localhost:3000

🗃️ Database Overview
🔐 Users Table
UUID primary key

Email, hashed password (Bcrypt), timestamps

🤖 Agents Table
Agent details, pricing, features (JSON), category

💰 Pricing Plans
Plan name, price, agent limits, feature access

💳 Payments Table
User ID, transaction ID, amount, status, timestamps

🔐 Security Highlights
JWT Authentication – Encrypted and verified tokens

Password Hashing – Secure Bcrypt with salt

Input Validation – Joi-based schema checking

Rate Limiting – Protects APIs from abuse

SQL Injection Prevention – Safe queries

XSS/CSRF Defense – Proper sanitization and headers

💳 Payment Flow (Stripe)
Agent & Plan Selection

Price Calculation (Backend Verified)

Secure Stripe Checkout

Admin Email Notification

Transaction Logging

📧 Email Automation
Admin Alerts – Real-time purchase updates

User Onboarding – Welcome emails

Receipts – Payment confirmations

🖼 UI/UX Highlights
Polished Design – Modern, clean layout

Mobile-First – Seamless experience across devices

Accessible Components – WCAG-friendly

Consistent Branding – Color palette & typography

Interactive Elements – Smooth animations & transitions

📡 API Reference
🔐 Authentication
Endpoint	Method	Description
/auth/register	POST	User signup
/auth/login	POST	User login
/auth/verify	GET	Verify JWT token

🤖 Agents
Endpoint	Method	Description
/api/agents	GET	List all agents
/api/agents/:id	GET	Get agent by ID
/api/agents/category/:cat	GET	Get agents by category

💵 Pricing Plans
Endpoint	Method	Description
/api/pricing	GET	Get all pricing plans
/api/pricing/:id	GET	Get a specific plan

💳 Payments
Endpoint	Method	Description
/api/payment	POST	Process a payment
/api/payment/history	GET	User payment history

🚀 Production Deployment
Backend
NODE_ENV=production

Production database & SMTP

SSL certificates

PM2 process manager

Nginx reverse proxy

Error monitoring/logging

Frontend
Build: npm run build

Deploy on Vercel, Netlify, or CDN

Set environment variables

Configure custom domain & SSL

🧩 Error Handling
Centralized Error Middleware

Friendly Validation Feedback

Robust Auth & Token Checks

Transaction-Level Payment Logs

📈 Monitoring & Analytics
Health Checks – API availability

Request Logging – Endpoint tracing

Error Tracking – Detailed log output

Performance Metrics – Latency reports

🧪 Development Workflow
Backend-First API Design

Schema Modeling with MySQL

Component-Driven Frontend

Integration Testing

Security & Code Audits

🤝 Contributing
Want to help improve SOM AI?

bash
Copy
Edit
1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request 🚀
📩 Contact & Support
Email: admin@gflow.ai

GitHub Issues: Bug reports & feature requests

Docs: Check module-level README files

📜 License
Licensed under the MIT License. See LICENSE for more details.

🔁 Tagline
SOM AI – Automate Everything. Work Smarter.

