# 🏠 Airbnb Clone - Online Property Booking System

A full-stack web application inspired by Airbnb, built with **Node.js**, **Express.js**, **MySQL**, and **EJS**. This project demonstrates modern web development concepts including user authentication, role-based access control, database design, and CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat&logo=mysql&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-90C53F?style=flat&logo=ejs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [User Roles](#-user-roles)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)

---

## ✨ Features

### 👥 User Management

- **User Authentication**: Secure login/signup with role selection (Guest or Host)
- **Password Security**: Encrypted password storage
- **Session Management**: Express session-based authentication
- **Role-Based Access**: Different features for guests and hosts

### 🏘️ Guest Features

- **Browse Properties**: View all available properties in a grid layout
- **Property Details**: View detailed information about each property
- **Book Properties**: Make bookings by selecting check-in and check-out dates
- **My Bookings**: View all personal bookings with details
- **Favorites/Wishlist**: Save properties to favorites and manage wishlist
- **Property Search**: Find properties by browsing the catalog

### 🔑 Host Features

- **Add Properties**: List new properties with photos, pricing, location, and description
- **Edit Properties**: Update property details and photos
- **Delete Properties**: Remove properties from listings
- **Host Homes**: View all personally hosted properties
- **Reservations**: See all guest bookings for hosted properties with guest contact details

### 🎨 General Features

- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Image Management**: Upload and store property photos locally
- **Error Handling**: Comprehensive error pages and messages
- **Database**: Relational MySQL database with proper constraints

---

## 🛠️ Tech Stack

| Component              | Technology             |
| ---------------------- | ---------------------- |
| **Backend**            | Node.js                |
| **Framework**          | Express.js             |
| **Template Engine**    | EJS                    |
| **Database**           | MySQL                  |
| **Database Driver**    | mysql2 (Promise-based) |
| **Styling**            | Tailwind CSS           |
| **File Upload**        | Multer                 |
| **Session Management** | Express Session        |
| **Development Tool**   | Nodemon                |
| **Port**               | 3003                   |

---

## 📁 Project Structure

```
airbnb-clone/
├── controllers/           # Route logic (hostController, userController, etc.)
├── models/               # Database models (Home, Booking, User)
├── routes/               # Route definitions (hostRouter, userRouter, etc.)
├── utils/                # Utilities (databaseUtil, pathUtil)
├── views/                # EJS templates
│   ├── auth/            # Login/Signup pages
│   ├── store/           # Guest pages (homes, bookings, favorites)
│   ├── host/            # Host pages (properties, reservations)
│   └── partials/        # Reusable components (navbar, footer)
├── public/              # Static files (CSS, JavaScript)
├── uploads/             # Property images
├── app.js               # Main application file
├── package.json         # Dependencies
└── database.sql         # Database schema
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone https://github.com/hamzayar13/airbnb-clone.git
cd airbnb-clone
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create MySQL Database

```bash
mysql -u root -p < database.sql
```

---

## ⚙️ Configuration

### Environment Setup

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_db
DB_PORT=3306
```

### Database Connection

Edit `utils/databaseUtil.js` to configure database credentials:

```javascript
const db = require("mysql2/promise").createPool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "airbnb_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

---

## ▶️ Running the Application

### Development Mode (with auto-reload)

```bash
npm start
```

### Production Mode

```bash
node app.js
```

The application will be available at: **http://localhost:3003**

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| GET    | `/`       | Home page         |
| GET    | `/login`  | Login page        |
| POST   | `/login`  | User login        |
| GET    | `/signup` | Signup page       |
| POST   | `/signup` | User registration |
| GET    | `/logout` | User logout       |

### Guest Routes

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| GET    | `/homes`                     | Browse all properties |
| GET    | `/homes/:id`                 | View property details |
| GET    | `/reserve/:id`               | Booking page          |
| POST   | `/reserve/:id`               | Create booking        |
| GET    | `/bookings`                  | View my bookings      |
| GET    | `/favourites`                | View favorites        |
| POST   | `/add-to-favourite/:id`      | Add to favorites      |
| GET    | `/remove-from-favourite/:id` | Remove from favorites |

### Host Routes

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/host/add-home`       | Add property form   |
| POST   | `/host/add-home`       | Create property     |
| GET    | `/host/host-home-list` | View my properties  |
| GET    | `/host/edit/:id`       | Edit property form  |
| POST   | `/host/edit`           | Update property     |
| GET    | `/host/delete/:id`     | Delete property     |
| GET    | `/host/reservations`   | View guest bookings |

---

## 🗄️ Database Schema

### Users Table

```sql
- user_id (INT, Primary Key, Auto Increment)
- firstName (VARCHAR)
- lastName (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR, Encrypted)
- userType (ENUM: 'guest', 'host')
- createdAt (TIMESTAMP)
```

### Homes Table

```sql
- id (INT, Primary Key, Auto Increment)
- houseName (VARCHAR)
- price (DOUBLE)
- location (VARCHAR)
- rating (DOUBLE)
- photo (VARCHAR)
- description (LONGTEXT)
- host_id (INT, Foreign Key → users.id)
```

### Bookings Table

```sql
- booking_id (INT, Primary Key, Auto Increment)
- property_id (INT, Foreign Key → homes.id)
- guest_id (INT, Foreign Key → users.id)
- check_in_date (DATE)
- check_out_date (DATE)
- total_price (DECIMAL)
- status (ENUM: 'confirmed', 'pending', 'cancelled')
- booking_date (TIMESTAMP)
```

### Favourites Table

```sql
- favourite_id (INT, Primary Key, Auto Increment)
- user_id (INT, Foreign Key → users.id)
- property_id (INT, Foreign Key → homes.id)
```

---

## 👤 User Roles

### Guest

- Browse and search properties
- View detailed property information
- Make bookings for properties
- Add properties to favorites/wishlist
- View all personal bookings
- Cannot list or manage properties

### Host

- Create new property listings
- Edit and update property details
- Delete properties from catalog
- View all personal properties
- See all reservations from guests
- Cannot book properties (hosts are separate from guests)
- Receive booking notifications

---

## 📸 Screenshots

### Home Page

Browse all available properties with images, prices, and ratings.

### Property Details

View detailed information about a property including photos, description, amenities, and reviews.

### Booking Page

Select dates and create a booking for a property.

### Host Dashboard

Manage properties and view all reservations from guests.

### Favorites

Save and manage favorite properties.

---

## 🚀 Future Enhancements

### Feature Ideas

- [ ] **Search & Filtering**: Filter by price range, location, rating, amenities
- [ ] **Review System**: Guests can leave 5-star reviews for properties
- [ ] **Messaging**: Direct messaging between guests and hosts
- [ ] **Payment Integration**: Stripe/PayPal payment processing
- [ ] **Calendar View**: Interactive calendar for availability
- [ ] **Cancellation Policy**: Flexible, moderate, or strict cancellation options
- [ ] **Host Analytics**: Dashboard showing bookings, revenue, and statistics
- [ ] **Email Notifications**: Booking confirmations and reminders
- [ ] **Advanced Filters**: Amenities, property type, number of bedrooms
- [ ] **Map Integration**: View properties on interactive map

---

## 📝 License

This project is open source and available under the **MIT License**.

---

## 👨‍💻 Author

**Muhammad Hamza**

- GitHub: [@hamzayar13](https://github.com/hamzayar13)
- Project: [Airbnb Clone](https://github.com/hamzayar13/airbnb-clone)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## ❓ FAQ

**Q: How do I reset the database?**  
A: Run `mysql -u root -p < database.sql` to reinitialize the database.

**Q: Can hosts also be guests?**  
A: In this implementation, users choose either guest or host role at signup. To enable dual roles, modify the `userType` field in the users table.

**Q: Where are uploaded images stored?**  
A: Images are stored in the `/uploads` directory on the server.

**Q: How long do sessions last?**  
A: Sessions are configured for browser closure. To modify, adjust the session configuration in `app.js`.

---

## 📞 Support

For issues, questions, or suggestions, please:

- Open an [GitHub Issue](https://github.com/hamzayar13/airbnb-clone/issues)
- Contact the author directly

---

**Made with ❤️ for university project**
