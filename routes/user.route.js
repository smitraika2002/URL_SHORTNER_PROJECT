import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../models/index.js';
import { randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';

const router = express.Router();

// 👉 This API is used to register a new user
router.post('/register', async (req, res) => {

  // 📥 Get data sent from frontend/Postman
  const { name, password, age, email } = req.body;

  // ❌ Check if any field is missing
  if (!name || !password || !age || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // 🔍 Check if user already exists in database
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // ❌ If user already exists, stop here
  if (existingUser.length > 0) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // 🔐 Create random salt (for password security)
  const salt = randomBytes(16).toString('hex');

  // ⚠️ Simple password + salt (later we use bcrypt)
  const hashedPassword = password + salt;

  // 💾 Save user into database
  const user = await db
    .insert(usersTable)
    .values({
      name,            // user name
      age,             // user age
      email,           // user email
      password: hashedPassword, // saved password
      salt: salt       // saved salt
    })
    .returning({ id: usersTable.id });

  // ✅ Send success response
  return res.status(201).json({
    message: 'User registered successfully',
    userId: user[0].id
  });
});

export default router;