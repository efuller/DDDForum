import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from './config';
import { db } from './db';

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  res.send('User created');
});

// Edit a user
app.post('users/edit/:userId', async (req: Request, res: Response) => {
  res.send('User edited');
});

// Get user by email
app.get('/users', async (req: Request, res: Response) => {
  res.send('User found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
