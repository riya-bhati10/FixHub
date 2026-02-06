# FixHub - Home Appliance Repair Service Platform

A full-stack web application connecting customers with skilled technicians for home appliance repair services. Built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Database Models](#database-models)
- [Real-time Features](#real-time-features)

## 🎯 Overview

FixHub is a comprehensive service marketplace platform that enables:
- **Customers** to book repair services for various home appliances
- **Technicians** to manage bookings, update service status, and earn income
- **Admins** to oversee platform operations, manage users, and track earnings

## ✨ Features

### Customer Features
- Browse and search technicians by service category
- Book repair services with preferred date/time
- Track booking status in real-time
- Rate and review completed services
- Manage profile and booking history
- Receive notifications for booking updates
- Cancel pending bookings

### Technician Features
- Create and manage service listings
- Accept/decline booking requests
- Update booking status (pending → accepted → in-progress → pending-completion → completed)
- OTP-based service completion verification
- Track earnings and completed jobs
- Receive real-time booking notifications
- Profile management

### Admin Features
- Dashboard with platform analytics
- Manage technicians and customers
- Block/unblock users
- Track total earnings and revenue
- View all bookings and services
- Monitor platform activity

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19.2.0 with Vite
- **Routing:** React Router DOM 7.12.0
- **Styling:** Tailwind CSS 3.4.0 + Styled Components 6.3.8
- **HTTP Client:** Axios 1.13.4
- **Real-time:** Socket.IO Client 4.8.3
- **UI Components:** Lucide React (icons), Recharts (charts), Sonner (toasts)
- **Build Tool:** Vite 7.2.4

### Backend
- **Runtime:** Node.js with Express 5.2.1
- **Database:** MongoDB with Mongoose 9.1.4
- **Authentication:** JWT (jsonwebtoken 9.0.3) + bcryptjs 3.0.3
- **Real-time:** Socket.IO 4.8.3
- **Security:** CORS 2.8.5
- **Environment:** dotenv 17.2.3

## 📁 Project Structure

```
FixHub/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── socket.js             # Socket.IO configuration
│   ├── controllers/
│   │   ├── admin.controller.js   # Admin operations
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── booking.controller.js # Booking management
│   │   ├── notification.controller.js
│   │   ├── review.controller.js  # Rating & reviews
│   │   ├── service.controller.js # Service listings
│   │   ├── technician.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   ├── block.middleware.js   # User blocking checks
│   │   └── role.middleware.js    # Role-based access
│   ├── models/
│   │   ├── blacklistToken.model.js
│   │   ├── booking.model.js
│   │   ├── earning.model.js
│   │   ├── notification.model.js
│   │   ├── review.model.js
│   │   ├── service.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── booking.routes.js
│   │   ├── notification.routes.js
│   │   ├── review.routes.js
│   │   ├── service.routes.js
│   │   ├── technician.routes.js
│   │   └── user.routes.js
│   ├── utils/
│   │   ├── auth.utils.js
│   │   ├── booking.utils.js
│   │   └── rating.helper.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── assets/              # Images & static files
│   │   ├── Common/              # Shared components
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Navbar.jsx
│   │   ├── Components/
│   │   │   ├── Admin/           # Admin components
│   │   │   ├── Auth.jsx
│   │   │   ├── GadgetsCarousel.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   └── TestimonialsSection.jsx
│   │   ├── config/
│   │   │   └── api.js           # Axios configuration
│   │   ├── context/
│   │   │   └── UserContext.jsx  # User state management
│   │   ├── contexts/
│   │   │   └── SocketContext.jsx # Socket.IO context
│   │   ├── hooks/
│   │   │   ├── useAutoRefresh.js
│   │   │   └── useRealTimeData.js
│   │   ├── layouts/
│   │   │   ├── Admin/
│   │   │   └── PublicLayout.jsx
│   │   ├── pages/
│   │   │   ├── Admin/           # Admin pages
│   │   │   ├── customer/        # Customer pages
│   │   │   ├── Landing/         # Public pages
│   │   │   └── Technician/      # Technician pages
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   ├── Services/            # API service layer
│   │   │   ├── adminService.js
│   │   │   ├── apiService.js
│   │   │   ├── axiosInstance.js
│   │   │   ├── bookingService.js
│   │   │   ├── reviewService.js
│   │   │   ├── serviceApi.js
│   │   │   ├── technicianService.js
│   │   │   └── userService.js
│   │   ├── theme/
│   │   │   └── fixhubTheme.js
│   │   ├── utils/
│   │   │   └── toastConfig.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

Application will run on `http://localhost:5173`

5. Build for production:
```bash
npm run build
```

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Frontend (.env)
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API URL | Yes |
| `VITE_SOCKET_URL` | Socket.IO server URL | Yes |

## 📡 API Documentation

### Authentication Endpoints
```
POST   /api/auth/signup          - Register new user
POST   /api/auth/login           - User login
GET    /api/auth/logout          - User logout
GET    /api/auth/me              - Get current user
PUT    /api/auth/update-profile  - Update user profile
```

### Booking Endpoints
```
POST   /api/bookings/                    - Create booking (Customer)
GET    /api/bookings/customer            - Get customer bookings
GET    /api/bookings/technician          - Get technician bookings
PATCH  /api/bookings/:id/accept          - Accept booking (Technician)
PATCH  /api/bookings/:id/cancel          - Cancel booking
PATCH  /api/bookings/:id/status          - Update booking status (Technician)
POST   /api/bookings/:id/verify-otp      - Verify completion OTP
POST   /api/bookings/:id/resend-otp      - Resend completion OTP
```

### Service Endpoints
```
GET    /api/services/                    - Get all services
GET    /api/services/:id                 - Get service by ID
POST   /api/services/                    - Create service (Technician)
PUT    /api/services/:id                 - Update service (Technician)
DELETE /api/services/:id                 - Delete service (Technician)
GET    /api/services/category/:category  - Get services by category
```

### Review Endpoints
```
POST   /api/reviews/              - Submit review (Customer)
GET    /api/reviews/technician/:id - Get technician reviews
GET    /api/reviews/booking/:id   - Get booking review
```

### Notification Endpoints
```
GET    /api/notifications/        - Get user notifications
PATCH  /api/notifications/:id/read - Mark notification as read
DELETE /api/notifications/:id     - Delete notification
```

### Admin Endpoints
```
GET    /api/admin/dashboard       - Get dashboard stats
GET    /api/admin/users           - Get all users
PATCH  /api/admin/users/:id/block - Block/unblock user
GET    /api/admin/earnings        - Get earnings data
```

### Technician Endpoints
```
GET    /api/technician/profile    - Get technician profile
GET    /api/technician/earnings   - Get technician earnings
GET    /api/technician/stats      - Get technician statistics
```

## 👥 User Roles

### 1. Customer
- Browse and book services
- Track booking status
- Rate and review technicians
- Manage profile

### 2. Technician
- Create service listings
- Manage bookings
- Update service status
- Track earnings
- View reviews

### 3. Admin
- Platform oversight
- User management
- Revenue tracking
- System monitoring

## 🗄 Database Models

### User Model
```javascript
{
  fullname: { firstname, lastname },
  email: String (unique),
  password: String (hashed),
  phone: String (unique),
  role: Enum ['customer', 'technician', 'admin'],
  location: String,
  isBlocked: Boolean,
  totalEarnings: Number,
  timestamps: true
}
```

### Booking Model
```javascript
{
  customer: ObjectId (ref: User),
  technician: ObjectId (ref: User),
  serviceType: String,
  description: String,
  location: String,
  preferredDate: Date,
  preferredTime: String,
  estimatedPrice: Number,
  actualPrice: Number,
  status: Enum ['pending', 'accepted', 'in-progress', 'pending-completion', 'completed', 'cancelled'],
  completionOTP: String,
  otpGeneratedAt: Date,
  rating: Number (1-5),
  review: String,
  timestamps: true
}
```

### Service Model
```javascript
{
  technicianId: ObjectId (ref: User),
  serviceName: String,
  description: String,
  image: String,
  serviceCharge: Number,
  experience: Number,
  completedJobs: Number,
  isActive: Boolean,
  timestamps: true
}
```

### Review Model
```javascript
{
  customerId: ObjectId (ref: User),
  technicianId: ObjectId (ref: User),
  bookingId: ObjectId (ref: Booking),
  rating: Number (1-5),
  review: String,
  timestamps: true
}
```

### Notification Model
```javascript
{
  userId: ObjectId (ref: User),
  title: String,
  message: String,
  type: Enum ['booking_request', 'booking_accepted', 'booking_completed', 'booking_cancelled', 'review_received', 'otp', 'system'],
  recipient: Enum ['customer', 'technician', 'all'],
  data: Mixed,
  read: Boolean,
  timestamps: true
}
```

### Earning Model
```javascript
{
  technician: ObjectId (ref: User),
  booking: ObjectId (ref: Booking),
  totalAmount: Number,
  adminCut: Number,
  technicianAmount: Number,
  status: Enum ['pending', 'paid'],
  timestamps: true
}
```

## 🔄 Real-time Features

The application uses Socket.IO for real-time updates:

- **Booking Notifications**: Instant alerts for new bookings, acceptances, and status changes
- **OTP Delivery**: Real-time OTP notifications for service completion
- **Status Updates**: Live booking status synchronization
- **Admin Dashboard**: Real-time platform statistics

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Token blacklisting on logout
- Role-based access control (RBAC)
- Protected routes with middleware
- User blocking mechanism
- OTP verification for service completion (1-minute expiry)

## 🎨 Service Categories

- Mobile Phones
- Laptops & Computers
- Televisions
- Washing Machines
- Refrigerators
- Air Conditioners
- Fans
- Mixers & Grinders
- Smart Watches
- Other Electronics

## 📊 Booking Workflow

1. **Customer** creates booking → Status: `pending`
2. **Technician** accepts booking → Status: `accepted`
3. **Technician** starts work → Status: `in-progress`
4. **Technician** requests completion → Status: `pending-completion` (OTP sent to customer)
5. **Customer** shares OTP with technician
6. **Technician** verifies OTP → Status: `completed`
7. **Customer** can rate and review the service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

FixHub Development Team

## 🐛 Known Issues

- OTP expiry is set to 1 minute (configurable)
- Temporary password reset endpoint exists (remove in production)





---

**Built with ❤️ using React, Node.js, Express, and MongoDB**
