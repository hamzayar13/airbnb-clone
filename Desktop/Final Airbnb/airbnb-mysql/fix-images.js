const db = require("./utils/databaseUtil");
const fs = require("fs");
const path = require("path");

async function fixImagePaths() {
  try {
    console.log("🔧 Fixing image paths in database...\n");

    // Get all homes
    const [homes] = await db.query("SELECT id, houseName FROM homes");

    // Get all uploaded files
    const uploadsDir = path.join(__dirname, "uploads");
    const files = fs
      .readdirSync(uploadsDir)
      .filter((f) => f.match(/\.(jpg|jpeg|png)$/i));

    console.log(`📁 Found ${files.length} image files in /uploads:\n`);

    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file}`);
    });

    console.log("\n---\n");
    console.log(`📊 Database homes: ${homes.length}`);
    homes.forEach((h) => {
      console.log(
        `  Home ${h.id}: "${h.houseName}" - Photo: ${h.photo ? h.photo : "NULL"}`,
      );
    });

    console.log("\n⚠️  Instructions to fix:");
    console.log("1. Go to MySQL and run:");
    console.log(
      `   UPDATE homes SET photo = 'uploads/[FILENAME]' WHERE id = [ID];`,
    );
    console.log("\n2. Replace [FILENAME] and [ID] with actual values");
    console.log("\n3. Example:");
    console.log(
      `   UPDATE homes SET photo = 'uploads/bcxmjjgtii-house1.png' WHERE id = 1;`,
    );
    console.log(
      `   UPDATE homes SET photo = 'uploads/sceumiumec-house5.png' WHERE id = 2;`,
    );
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
  process.exit(0);
}

fixImagePaths();
