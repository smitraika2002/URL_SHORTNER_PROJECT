import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../models/index.js';
import { randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { registerRequestSchema } from '../validation/request.validation.js';

const router = express.Router();

router.post('/register', async (req, res) => {

  // ✅ Validate request using Zod
  const validationResult = await registerRequestSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.flatten() });
  }

  // ✅ Extract validated data
  const { name, password, age, email } = validationResult.data;

  // 🔍 Check if user already exists
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser.length > 0) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // 🔐 Generate salt
  const salt = randomBytes(16).toString('hex');

  const hashedPassword = password + salt;

  // 💾 Insert user
  const user = await db
    .insert(usersTable)
    .values({
      name,
      age,
      email,
      password: hashedPassword,
      salt: salt
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({
    message: 'User registered successfully',
    userId: user[0].id
  });
});

export default router;