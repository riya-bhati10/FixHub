# FixHub - Home Appliance Repair Service Platform

A full-stack web application connecting customers with skilled technicians for home appliance repair services. Built with React, Node.js, Express, and MongoDB.

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

##  Known Issues

- OTP expiry is set to 1 minute (configurable)
- Temporary password reset endpoint exists (remove in production)


