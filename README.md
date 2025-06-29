# Aircnc - Airbnb Clone

Aircnc is a full-stack web application that replicates core Airbnb functionality. It's built with React for the frontend and Express.js for the backend, offering a modern and responsive user interface for property listing and booking.

## ✨ Try it Live!

Why read about it when you can experience it yourself? Visit our live demo at [Aircnc Live Demo](https://airbnb-project-eef2.onrender.com) and explore the following features:

- 🏡 Browse through our curated collection of unique stays
- 🔍 Search for your dream vacation spot
- 📅 Test the booking system (don't worry, it's just a demo!)
- 🎯 Experience the smooth, Airbnb-like user interface
- 💻 Responsive design - works great on desktop and mobile!

Feel free to sign up and try out both guest and host features. We'd love to hear your feedback!

## Features

// ... existing code ...

- `/api/review` - Review management
  - GET `/` - Get all reviews
  - POST `/` - Add new review
  - PUT `/:id` - Update review
  - DELETE `/:id` - Delete review

## Project Structure

```
aircnc-project/
├── frontend/          # React frontend application
│   ├── public/        # Static assets
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

## License

This project is licensed under the ISC License.

## Acknowledgments

- Inspired by Airbnb's design and functionality
- Built with modern web technologies
- Uses Socket.io for real-time communication

---

**Note:** This is a clone project created for educational purposes and is not affiliated with Airbnb.
