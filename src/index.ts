import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from './config';
import { db } from './db';

// Function to generate a random password
function generatePassword() {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post('/users/new', async (req: Request, res: Response) => {
  const user = req.body;
  const newUser = {
    ...user,
    password: generatePassword(),
  }

  if (!newUser.email || !newUser.userName) {
    res.status(400).json({
      error: 'ValidationError',
      data: undefined,
      success: false,
    });
    return;
  }

  try {
    // Check to see if the username has already been used.
    const userNameTaken = await db.query(`
    SELECT username
    FROM users
    WHERE username = $1;
    `, [newUser.userName]
    );
    if (userNameTaken.rows.length > 0) {
     return res.status(409).json({
        error: 'UsernameAlreadyTaken',
        data: undefined,
        success: false,
      });
    }

    // Check to see if the user email has already been used.
    const emailAlreadyInUse = await db.query(`
    SELECT email
    FROM users
    WHERE email = $1;
    `, [newUser.email]
    );
    if (emailAlreadyInUse.rows.length > 0) {
      return res.status(409).json({
        error: 'EmailAlreadyInUse',
        data: undefined,
        success: false,
      });
    }
  } catch (error: unknown) {
    return res.status(500).json({
      error: 'ServerError',
      data: undefined,
      success: false,
    });
  }

  try {
    const result = await db.query(`
    INSERT INTO users (email, password, userName, firstName, lastName)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, email, userName;
    `, [newUser.email, newUser.password, newUser.userName, newUser.firstName, newUser.lastName]
    );
    const user = result.rows[0];

    res.status(201).json({
      error: undefined,
      data: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      success: true,
    });
  } catch (error: unknown) {
    res.status(500).json({
      error: 'ServerError',
      data: undefined,
      success: false,
    });
  } finally {
    await db.end();
  }
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
