import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Bidorai Backend is running!' });
});

// Simple test endpoint
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to Bidorai Backend API' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Simple backend server listening on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
}); 