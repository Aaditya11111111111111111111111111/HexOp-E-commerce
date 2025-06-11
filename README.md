# E-commerce Platform

A full-stack e-commerce platform built with React, Node.js, and MongoDB. This project consists of three main components: a customer-facing frontend, an admin dashboard, and a backend API.

## 🚀 Features

- User authentication and authorization
- Product browsing and searching
- Shopping cart functionality
- Order management
- Admin dashboard for product and order management
- Responsive design for all devices
- Secure payment processing
- Email notifications

## 🏗️ Project Structure

The project is divided into three main directories:

- `frontend/` - React-based customer-facing application
- `backend/` - Node.js/Express API server
- `admin/` - React-based admin dashboard

### Frontend
- React 18
- React Router DOM
- React Toastify
- Modern CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Nodemailer for email notifications

### Admin Dashboard
- React
- Vite
- Modern UI components

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd e-commerce
```

2. Install dependencies for all three components:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install admin dashboard dependencies
cd ../admin
npm install
```

3. Set up environment variables:
   - Create `.env` files in both backend and frontend directories
   - Add necessary environment variables (see .env.example files)

4. Start the development servers:

```bash
# Start backend server
cd backend
npm start

# Start frontend application
cd frontend
npm start

# Start admin dashboard
cd admin
npm run dev
```

## 🔧 Configuration

Each component has its own configuration files:
- Frontend: `frontend/.env`
- Backend: `backend/.env`
- Admin: `admin/.env`

## 📝 API Documentation

The backend API documentation is available in the `backend/h.http` file. It includes all available endpoints and their usage.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Aaditya Nepal - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries 
