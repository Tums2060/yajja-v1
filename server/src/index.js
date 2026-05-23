
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
require("dotenv").config();

const app = express();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Yajja API Running",
  });
});

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return secret;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role ? user.role.toLowerCase() : undefined,
    createdAt: user.createdAt,
  };
}

const ROLE_MAP = {
  customer: "CUSTOMER",
  rider: "RIDER",
  vendor: "VENDOR",
  admin: "ADMIN",
};

function normalizeRole(input, fallback) {
  if (input === undefined || input === null || input === "") {
    return fallback ?? null;
  }

  const normalized = String(input).toLowerCase();
  return ROLE_MAP[normalized] || null;
}

app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const normalizedRole = normalizeRole(role, "CUSTOMER");

    if (!normalizedRole) {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (!email || !phone || !password) {
      return res.status(400).json({ message: "Email, phone, and password are required." });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email or phone already in use." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        phone,
        passwordHash,
        role: normalizedRole,
      },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role.toLowerCase() },
      getJwtSecret(),
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to sign up." });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const normalizedRole = normalizeRole(role, null);

    if (role && !normalizedRole) {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (normalizedRole && user.role !== normalizedRole) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role.toLowerCase() },
      getJwtSecret(),
      { expiresIn: "7d" }
    );
    return res.status(200).json({
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to log in." });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});