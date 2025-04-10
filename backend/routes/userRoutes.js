// routes/userRoutes.js
import express from 'express';

const router = express.Router();

// Sample route for testing
router.get('/', (req, res) => {
  res.send('User route working');
});

export default router;


