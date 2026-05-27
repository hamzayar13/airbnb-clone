# ⚡ Quick Start Guide

## 🎯 One-Time Setup

### 1️⃣ Update Database (MOST IMPORTANT!)

```sql
-- Open MySQL client and run this:
USE `Airbnb project`;

-- Run the entire database.sql file from your project
-- OR paste this directly:

DROP TABLE IF EXISTS bookings;

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

### 2️⃣ Start the Server

```bash
cd "/Users/muhammadhamzayar/Desktop/Final Airbnb/airbnb-mysql"
npm start
```

**Server runs on: http://localhost:3003**

---

## 🧪 Quick Test (5 minutes)

1. Open **http://localhost:3003** in browser
2. **Login** (or register if needed)
3. **Browse properties** - Click "View" on any property
4. **Book a property** - Click "Book Now"
5. **Select dates** - Pick check-in and check-out
6. **Confirm** - Your booking is created!
7. **View bookings** - Click "My Bookings" in menu

---

## ✅ What Works Now

| Feature | Status | Notes |
|---------|--------|-------|
| Register/Login | ✅ Works | Guest or Host |
| Browse Properties | ✅ Works | Images display |
| View Details | ✅ Works | Full description |
| Upload Photos | ✅ Works | jpg/jpeg/png only |
| Edit Properties | ✅ Works | Hosts only |
| Delete Properties | ✅ Works | Hosts only |
| **Book Property** | ✅ **NEW** | Date selection |
| **View Bookings** | ✅ **NEW** | Shows all reservations |
| **Cancel Booking** | ✅ **NEW** | Change status |
| Save Favorites | ✅ Works | Wishlist feature |
| View Favorites | ✅ Works | See saved properties |

---

## 🆘 If Something Goes Wrong

### Images Not Showing?
```
✓ Make sure /uploads folder exists
✓ Check uploads have "uploads/" in database
✓ Restart server with: npm start
```

### "Table doesn't exist: bookings" Error?
```
✓ You didn't run the SQL update!
✓ Go back to Step 1 and run database.sql
✓ Then restart server
```

### "Cannot POST /reserve" Error?
```
✓ Make sure routes/storeRouter.js has booking routes
✓ Check that models/booking.js exists
✓ Restart server
```

### Book Button Not Working?
```
✓ Must be logged in as guest
✓ Check browser console for errors (F12)
✓ Clear cache: Ctrl+Shift+Delete
```

---

## 📱 User Flows

### As a Guest:
```
Login → Browse Properties → Click View → Click Book Now
→ Select Dates → Confirm → View in My Bookings
```

### As a Host:
```
Login → Host Dashboard → Add Home → Upload Photo
→ View Hosted Properties → Edit or Delete
```

---

## 🔍 Where to Find Things

| Feature | Location |
|---------|----------|
| Book a property | Click "Book" on any home card |
| My bookings | Navigation menu → "My Bookings" |
| Edit property | Host dashboard → "Edit" button |
| Delete property | Host dashboard → "Delete" button |
| Add property | Click "+ Add New" on host page |
| My favorites | Navigation menu → "Favorites" |

---

## 💡 Pro Tips

1. **Test Data**: Add a few properties first (as host), then book them (as guest)
2. **Date Format**: Use the date picker, don't type manually
3. **Total Price**: Auto-calculated based on nights × price/night
4. **Cancellations**: Status changes to "cancelled", not deleted
5. **Images**: Must be jpg, jpeg, or png format

---

## 📊 Database Stats

| Table | Rows | Purpose |
|-------|------|---------|
| users | 1+ | Store user accounts |
| homes | 1+ | Store property listings |
| bookings | 0+ | Store reservations |
| favourites | 0+ | Store wishlist items |

---

## 🎓 What You Learned

✅ Express.js routing  
✅ EJS templating  
✅ MySQL with Node.js  
✅ CRUD operations  
✅ Database relationships (Foreign Keys)  
✅ Authentication & Sessions  
✅ File uploads (Multer)  
✅ Real-world project structure  

---

## 🚀 You're Ready!

Everything is set up and working. Just:
1. Update database (if not done)
2. Run `npm start`
3. Test the booking flow
4. Have fun! 🎉

---

**Questions?** Check SETUP_INSTRUCTIONS.md for detailed info.
