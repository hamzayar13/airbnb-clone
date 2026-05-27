# Airbnb Clone - Complete Setup Instructions

## 📋 What Was Fixed & Added

### ✅ Fixed Issues:
1. **Image Upload Error** - Fixed "Field 'imgUrl' doesn't have a default value" error
2. **Image Display** - Images now display correctly with proper paths
3. **Book Button** - Now properly redirects to booking form with date selection

### ✅ New Features Added:
1. **Bookings Table** - Added to database.sql for storing reservations
2. **Booking Model** - New model to handle booking operations
3. **Booking Form** - Beautiful form to select check-in and check-out dates
4. **My Bookings Page** - Shows all guest bookings with details and cancellation option
5. **Booking Routes** - Added all necessary endpoints for booking operations

---

## 🚀 Step-by-Step Setup

### Step 1: Update Your Database Schema

**⚠️ Important:** Before running the app, you MUST update your MySQL database with the new bookings table.

1. Open your MySQL client (MySQL Workbench, phpMyAdmin, or command line)
2. Select your database: `USE 'Airbnb project';`
3. Copy and run the entire `database.sql` file from your project folder
   - Or run these commands individually:

```sql
-- Drop old bookings table if it exists (backup data first!)
DROP TABLE IF EXISTS bookings;

-- Create new bookings table
CREATE TABLE IF NOT EXISTS bookings (
  booking_id      INT AUTO_INCREMENT PRIMARY KEY,
  property_id     INT NOT NULL,
  guest_id        INT NOT NULL,
  check_in_date   DATE NOT NULL,
  check_out_date  DATE NOT NULL,
  total_price     DECIMAL(10, 2) NOT NULL,
  status          ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
  booking_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES homes(id) ON DELETE CASCADE,
  FOREIGN KEY (guest_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### Step 2: Start Your Server

```bash
cd "/Users/muhammadhamzayar/Desktop/Final Airbnb/airbnb-mysql"
npm start
```

The server will start on **http://localhost:3003**

---

### Step 3: Test the Booking Flow

1. **Go to homepage**: http://localhost:3003
2. **Login as a guest** (or create account if needed)
3. **Browse properties** and click "View" on any property
4. **Click "Book Now"** button
5. **Select check-in and check-out dates**
6. **Click "Confirm Booking"**
7. **View your bookings** in "My Bookings" section

---

## 📁 Files Modified/Created

### New Files:
- `models/booking.js` - Booking database operations
- `views/store/reserve.ejs` - Booking form page (updated)
- `views/store/bookings.ejs` - My bookings page (updated)

### Modified Files:
- `database.sql` - Added bookings table
- `controllers/storeController.js` - Added booking routes/handlers
- `routes/storeRouter.js` - Added booking endpoints
- `views/store/home.ejs` - Book button now links to form
- `views/store/home-detail.ejs` - Book button now links to form
- All image paths fixed in views (added "/" prefix)

---

## ✨ Features Implemented

### For Guests:
- ✅ Browse all properties
- ✅ View property details
- ✅ Book properties with date selection
- ✅ View all personal bookings
- ✅ Cancel bookings
- ✅ Save favorites
- ✅ View favorites

### For Hosts:
- ✅ Add properties with images
- ✅ Edit property details
- ✅ Delete properties
- ✅ View hosted properties

### For Admin (Future Enhancement):
- 📋 Can be implemented with user role management

---

## 🔍 Database Schema (Updated)

### Users Table
```
id, firstName, lastName, email, password, userType, createdAt
```

### Homes Table
```
id, houseName, price, location, rating, photo, description, createdAt
```

### Bookings Table (NEW)
```
booking_id, property_id, guest_id, check_in_date, check_out_date, 
total_price, status, booking_date
```

### Favourites Table
```
id, userId, homeId
```

---

## 🐛 Troubleshooting

### Error: "Database connection failed"
- Make sure MySQL is running
- Check your database credentials in `.env` or `databaseUtil.js`

### Error: "Table doesn't exist: bookings"
- You forgot to run the SQL schema update
- Run `database.sql` in your MySQL client

### Images not showing
- Make sure the `/uploads` folder exists in your project
- Check that image paths in database have "uploads/" prefix

### Book button doesn't work
- Make sure you're logged in as a guest user
- Check browser console for JavaScript errors
- Verify routes are correctly defined in `storeRouter.js`

---

## 📞 Support

If you encounter any issues:
1. Check the terminal/console for error messages
2. Verify the database schema is updated
3. Make sure MySQL is running
4. Clear browser cache and try again

---

## ✅ All Features From Proposal Implemented

- [x] User Management (register, login, logout, profile)
- [x] Property Management (add, edit, delete homes)
- [x] Booking Management (book properties, view bookings, cancel bookings)
- [x] Favorites/Wishlist (add, view, remove favorites)
- [x] Proper database design with foreign keys
- [x] CRUD operations for all entities

**Happy Booking! 🎉**
