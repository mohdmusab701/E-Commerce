# Apna Cart - MERN E-Commerce Platform

🛒 A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring modern design, secure authentication, Stripe payment integration, and comprehensive admin dashboard.


## ✨ Features

### Customer Features
- 🏠 **Beautiful Homepage** with hero section and featured products
- 🔍 **Advanced Product Search** with filters (category, price range, rating)
- 🛍️ **Shopping Cart** with quantity management and persistent storage
- 💳 **Secure Checkout** with Stripe payment integration
- 👤 **User Authentication** with JWT tokens and secure refresh mechanism
- 📦 **Order History** and order tracking
- ⭐ **Product Reviews** and ratings

### Admin Features
- 📊 **Sales Dashboard** with analytics and charts
- 📝 **Product Management** (CRUD operations)
- 📋 **Order Management** with status updates
- 👥 **User Management**
- 📈 **Sales Statistics** (last 7 days)

### Technical Features
- ⚡ **Fast Performance** with Vite
- 🎨 **Premium UI** with Tailwind CSS and glassmorphism effects
- 🔐 **Secure** with bcrypt password hashing and HTTP-only cookies
- 📱 **Fully Responsive** design
- 🌐 **RESTful API** with proper error handling
- 💾 **MongoDB** with Mongoose ODM

## 🚀 Tech Stack

### Frontend
- **React - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Stripe.js** - Payment processing
- **React Hook Form** - Form validation
- **Axios** - HTTP client
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** - Payment gateway
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- **Node.js**   npm
- **MongoDB** 4.4+ (or use Docker)
- **Stripe Account** for payment processing

## 🔧 Installation & Setup

### Option 1: Local Development

#### 1. Clone the repository
```bash
git clone <repository-url>
cd E-Commerce
```

#### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
copy .env.example .env

# Edit .env and add your configuration:
# - MongoDB connection string
# - JWT secrets
# - Stripe API keys
```

#### 3. Setup Frontend
```bash
cd ../frontend
npm install

# Create .env file
copy .env.example .env

# Edit .env and add:
# - API URL (http://localhost:5000/api)
# - Stripe publishable key
```

#### 4. Run the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Option 2: Docker (Recommended)

#### 1. Create environment files
```bash
# Copy example files
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env

# Edit the .env files with your configuration
```

#### 2. Start all services
```bash
docker-compose up --build
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 3000

#### 3. Access the application
Open http://localhost:3000 in your browser

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/apnacart
JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLIENT_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Add review (protected)
- `GET /api/products/categories` - Get all categories

### Orders
- `POST /api/orders/payment-intent` - Create payment intent (protected)
- `POST /api/orders/confirm` - Confirm order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders/all/list` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/stats/analytics` - Get order statistics (admin only)

## 🧪 Testing

### Test Stripe Payment
Use these test card details:
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

### Create Admin User
1. Register a new user through the UI
2. Manually update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 🚢 Deployment

### Production Build

#### Frontend
```bash
cd frontend
npm run build
# Build output will be in 'dist' folder
```

#### Backend
```bash
cd backend
npm start
# Ensure all environment variables are set
```

```

## 📁 Project Structure

```
E-Commerce/
├── backend/                 # Backend API
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── server.js           # Entry point
│   └── package.json
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Static assets
│   └── package.json
├── docker-compose.yml      # Docker orchestration
├── .github/                # GitHub Actions
└── README.md
```





## 👨‍💻 Author

Built with Mohd Musab using the MERN stack

## 🙏 Acknowledgments

- [Stripe](https://stripe.com) for payment processing
- [Tailwind CSS](https://tailwindcss.com) for styling
- [MongoDB](https://mongodb.com) for database
- [React](https://react.dev) for the amazing UI library
