import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from './config';
import { db } from './db';

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  const newUser = {
    email: 'test@example3.com',
    password: 'password',
    userName: 'testuser3',
    firstName: 'Test',
    lastName: 'User',
  }

  const result = await db.query(`
    INSERT INTO users (email, password, userName, firstName, lastName)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, userName;
    `, [newUser.email, newUser.password, newUser.userName, newUser.firstName, newUser.lastName]
  );

  const responseValue = result.rows[0];

  res.status(201).json({
    id: responseValue.id,
    email: responseValue.email,
    userName: responseValue.userName,
  });
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
