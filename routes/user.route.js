import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../models/index.js';
import { registerRequestSchema } from '../validation/request.validation.js';
import { hashpasswordwithsalt } from '../utils/hash.js';
import { getuserbyemail } from '../services/user.service.js';

const router = express.Router();

router.post('/register', async (req, res) => {

  // ✅ Validate request using Zod
  const validationResult = await registerRequestSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ error: validationResult.error.flatten() });
  }

  // ✅ Extract validated data
  const { name, password, age, email } = validationResult.data;

  // ✅ Hash password with salt
  const { password: hashedPassword, salt } = hashpasswordwithsalt(password);

  // 🔍 Check if user already exists
    const existingUser = await getuserbyemail(email);

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