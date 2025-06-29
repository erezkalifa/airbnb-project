# Aircnc - Airbnb Clone

Aircnc is a full-stack web application that replicates core Airbnb functionality, serving as an in-depth case study of complex, production-grade web applications. The project's primary goal was to understand and recreate a sophisticated system from the ground up, focusing on intricate user experiences, rich interfaces, and pixel-perfect design implementation.

This educational endeavor demonstrates the complexities of modern web development, from user interface design to system architecture. The frontend, built with React, showcases advanced UI patterns, state management, and responsive design principles. The backend, powered by Express.js, implements essential features like real-time communication, secure authentication, and efficient data handling.

Key focus areas include:
- 🎨 Pixel-perfect design implementation
- 🔄 Complex state management and data flow
- 🎯 Rich, interactive user interfaces
- 📱 Responsive design across all devices
- 🔐 Secure user authentication and authorization
- ⚡ Real-time updates and notifications
- 🔍 Advanced search and filtering capabilities
- 📊 Efficient data handling and caching

> 🔗 **Looking for the backend code?** Check out our [Backend Repository](https://github.com/erezkalifa/airbnb-backend)

## ✨ Try it Live!

Why read about it when you can experience it yourself? Visit our live demo at [Aircnc Live Demo](https://airbnb-project-eef2.onrender.com) and explore the following features:

- 🏡 Browse through our curated collection of unique stays
- 🔍 Search for your dream vacation spot
- 📅 Test the booking system (don't worry, it's just a demo!)
- 🎯 Experience the smooth, Airbnb-like user interface
- 💻 Responsive design - works great on desktop and mobile!

Feel free to sign up and try out both guest and host features. We'd love to hear your feedback!

## Features

- 🏠 Property Listings: Browse through various properties with detailed information
- 🔍 Advanced Search: Filter properties by location, dates, and guest count
- 📅 Booking System: Make and manage property reservations
- 👤 User Authentication: Sign up, login, and manage your profile
- 📝 Host Dashboard: List and manage your properties
- 🗺️ Interactive Maps: View property locations using Google Maps integration
- 💬 Real-time Messaging: Socket.io powered communication between hosts and guests
- 📱 Responsive Design: Fully functional on both desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- Redux for state management
- React Router for navigation
- Material-UI components
- SASS for styling
- Vite as build tool
- Google Maps integration (@vis.gl/react-google-maps)
- Axios for API communication
- React Day Picker for date selection
- React Multi Carousel for image galleries

### Backend
- Express.js
- MongoDB for database
- Socket.io for real-time communication
- JWT & Cookie-based authentication
- RESTful API architecture
- Bcrypt for password hashing
- Cookie Parser for session management
- CORS for cross-origin resource sharing
- Deployed on Render

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Git
- MongoDB instance (local or cloud)
- Google Maps API key

### Frontend Setup
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/[your-username]/airbnb-project
   cd airbnb-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

### Backend Setup
1. Clone the backend repository:
   ```bash
   git clone https://github.com/erezkalifa/airbnb-backend
   cd airbnb-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run server:dev
   ```

The backend API will be available at `http://localhost:3030`

### Production Build
To create a production build of the frontend:
```bash
npm run build
```

To run the backend in production:
```bash
npm run server:prod
```

## API Endpoints

The backend API is accessible at:
- Development: `http://localhost:3030/api`
- Production: `https://airbnb-backend-egt6.onrender.com/api`

### Main Endpoints:
- `/api/auth` - Authentication routes
  - POST `/login` - User login
  - POST `/signup` - User registration
  - POST `/logout` - User logout

- `/api/user` - User management
  - GET `/` - Get all users
  - GET `/:id` - Get user by ID
  - PUT `/:id` - Update user
  - DELETE `/:id` - Delete user

- `/api/stay` - Property listings
  - GET `/` - Get all stays (with filters)
  - GET `/:id` - Get stay by ID
  - POST `/` - Create new stay
  - PUT `/:id` - Update stay
  - DELETE `/:id` - Delete stay

- `/api/reservation` - Booking management
  - GET `/` - Get all reservations
  - GET `/:id` - Get reservation by ID
  - POST `/` - Create new reservation
  - PUT `/:id` - Update reservation
  - DELETE `/:id` - Delete reservation

- `/api/review` - Review management
  - GET `/` - Get all reviews
  - POST `/` - Add new review
  - PUT `/:id` - Update review
  - DELETE `/:id` - Delete review

## Real-time Features

The application uses Socket.io for real-time communication:
- Instant messaging between hosts and guests
- Real-time booking notifications
- Live updates for property availability
- Immediate reservation status changes

## Project Structure

```
aircnc-project/
├── frontend/          # React frontend application
│   ├── public/        # Static assets
│   │   ├── img/      # Images and icons
│   │   └── favicon/  # Favicon files
│   └── src/
│       ├── assets/    # Styles, images, and other assets
│       ├── cmps/      # React components
│       ├── pages/     # Page components
│       ├── services/  # API and utility services
│       ├── store/     # Redux store configuration
│       └── hooks/     # Custom React hooks
│
├── backend/           # Express.js backend application
│   ├── api/          # API routes and controllers
│   ├── config/       # Configuration files
│   ├── middlewares/  # Express middlewares
│   ├── services/     # Business logic and database services
│   └── server.js     # Main server file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

Common issues and solutions:
- If the frontend fails to connect to the backend, check your CORS settings and API URLs
- For MongoDB connection issues, verify your connection string and network access
- Google Maps issues usually relate to API key configuration or billing setup
- For Socket.io connection problems, ensure both frontend and backend URLs match

## License

This project is licensed under the ISC License.

## Acknowledgments

- Inspired by Airbnb's design and functionality
- Built with modern web technologies
- Uses Socket.io for real-time communication
- Special thanks to all contributors and testers

---

**Note:** This is a clone project created for educational purposes and is not affiliated with Airbnb.
