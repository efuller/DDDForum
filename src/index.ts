import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from './config';
import { db } from './db';
import { create } from "node:domain";

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

    // Insert the new user into the database
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
    return res.status(500).json({
      error: 'ServerError',
      data: undefined,
      success: false,
    });
  }
});

// Edit a user
app.post('/users/edit/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = req.body;

  if (!user.email && !user.userName && !user.firstName && !user.lastName) {
    return res.status(400).json({
      error: 'ValidationError',
      data: undefined,
      success: false,
    });
  }

  try {
    // Check to see if the user exists
    const userExists = await db.query(`
    SELECT id
    FROM users
    WHERE id = $1;
    `, [userId]
    );
    if (userExists.rows.length === 0) {
      return res.status(404).json({
        error: 'UserNotFound',
        data: undefined,
        success: false,
      });
    }

    // Check to see if the username has already been used.
    const userNameTaken = await db.query(`
    SELECT username
    FROM users
    WHERE username = $1;
    `, [user.userName]
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
    `, [user.email]
    );
    if (emailAlreadyInUse.rows.length > 0) {
      return res.status(409).json({
        error: 'EmailAlreadyInUse',
        data: undefined,
        success: false,
      });
    }

    // Create a function that will create the update query with the correct fields
    const createUpdateQuery = (user: any) => {
      const fields = Object.keys(user);
      const values = Object.values(user);
      let query = `UPDATE users SET `;
      for (let i = 0; i < fields.length; i++) {
        if (i === fields.length - 1) {
          query += `${fields[i]} = $${i + 1} `;
        } else {
          query += `${fields[i]} = $${i + 1}, `;
        }
      }
      query += `WHERE id = ${userId} RETURNING id, email, userName, firstName, lastName;`;
      return query;
    }

    // Update the user in the database
    const updatedUserResult = await db.query(createUpdateQuery(user), Object.values(user));

    const foundUser = updatedUserResult.rows[0];

    res.status(201).json({
      error: undefined,
      data: {
        id: foundUser.id,
        email: foundUser.email,
        userName: foundUser.userName,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
      },
      success: true,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({
      error: 'ServerError',
      data: undefined,
      success: false,
    });
  }
});

// Get user by email
app.get('/users', async (req: Request, res: Response) => {
  res.send('User found');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
