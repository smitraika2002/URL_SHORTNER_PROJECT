import express from 'express';
import userRoutes from './routes/user.route.js';

const app = express();

// ✅ Middleware to read JSON body
app.use(express.json());

// ✅ Connect your routes
app.use('/', userRoutes);

// ✅ Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});