import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(express.json());

// ✅ Fix CORS properly
app.use(cors({
  origin: [
    "http://localhost:3000",                 // for local frontend
    "https://https://appointy-pi.vercel.app"       // replace with your deployed frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "devyani21",
  database: "vbapp",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("✅ Connected to database as id " + db.threadId);
});

// ----------------- USER REGISTRATION -----------------
app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ success: false, message: "Email already exists" });
          }
          return res.status(500).json({ success: false, message: "Database error" });
        }
        res.json({ success: true, message: "User registered successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------- PROVIDER REGISTRATION -----------------
app.post("/api/register-provider", async (req, res) => {
  const { name, email, password, service_type, designation, location } = req.body;

  if (!name || !email || !password || !service_type || !location) {
    return res.status(400).json({ success: false, message: "All required fields must be filled" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "provider"],
      (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ success: false, message: "Email already exists" });
          }
          return res.status(500).json({ success: false, message: "DB error" });
        }

        const userId = result.insertId;

        db.query(
          "INSERT INTO providers (user_id, service_type, designation, location) VALUES (?, ?, ?, ?)",
          [userId, service_type, designation || null, location],
          (err2) => {
            if (err2) {
              return res.status(500).json({ success: false, message: "DB error inserting provider" });
            }
            res.json({ success: true, message: "Provider registered successfully" });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------- GET SERVICES -----------------
app.get("/api/services", (req, res) => {
  db.query("SELECT * FROM services", (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error fetching services" });
    }
    res.json(rows);
  });
});

// ----------------- GET PROVIDERS BY SERVICE TYPE -----------------
app.get("/api/providers/:serviceType", (req, res) => {
  const { serviceType } = req.params;
  
  const query = `
    SELECT 
      u.name, 
      u.email,
      p.service_type,
      p.designation,
      p.location,
      p.bio,
      p.experience_years,
      p.hourly_rate,
      p.is_verified,
      AVG(r.rating) as average_rating,
      COUNT(r.id) as review_count
    FROM providers p
    JOIN users u ON p.user_id = u.id
    LEFT JOIN reviews r ON p.id = r.provider_id
    WHERE p.service_type = ?
    GROUP BY p.id
  `;

  db.query(query, [serviceType], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error fetching providers" });
    }
    res.json(results);
  });
});

// ----------------- LOGIN -----------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const user = results[0];

    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
      }

      let providerDetails = null;
      if (user.role === "provider") {
        const providerResult = await new Promise((resolve) => {
          db.query("SELECT * FROM providers WHERE user_id = ?", [user.id], (err, results) => {
            if (err) resolve(null);
            resolve(results[0] || null);
          });
        });
        providerDetails = providerResult;
      }

      const { password: pwd, ...userInfo } = user;
      res.json({ 
        success: true, 
        message: "Login successful", 
        user: userInfo,
        provider: providerDetails
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
});

// ----------------- CREATE APPOINTMENT -----------------
app.post("/api/appointments", (req, res) => {
  const { user_id, provider_id, service_type, appointment_date, appointment_time, duration_minutes, notes } = req.body;

  if (!user_id || !provider_id || !service_type || !appointment_date || !appointment_time) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  db.query(
    "INSERT INTO appointments (user_id, provider_id, service_type, appointment_date, appointment_time, duration_minutes, notes) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [user_id, provider_id, service_type, appointment_date, appointment_time, duration_minutes || 60, notes || ""],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "DB error creating appointment" });
      }
      res.json({ success: true, message: "Appointment created successfully", appointmentId: result.insertId });
    }
  );
});

// ----------------- GET USER APPOINTMENTS -----------------
app.get("/api/appointments/user/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      a.*,
      u.name as user_name,
      p.user_id as provider_user_id,
      up.name as provider_name,
      p.service_type,
      p.designation,
      p.location
    FROM appointments a
    JOIN users u ON a.user_id = u.id
    JOIN providers p ON a.provider_id = p.id
    JOIN users up ON p.user_id = up.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "DB error fetching appointments" });
    }
    res.json(results);
  });
});

// ✅ Use environment port for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
