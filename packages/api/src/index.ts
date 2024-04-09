import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from './config';
import { db } from './db';
import { eq } from "drizzle-orm";
import { NewUser, User, users } from "./db/schema";

/**--------------Helpers--------------**/

function isValidEmail(email: string) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

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


/**--------------User Service--------------**/

class UserService {
  public async createUser(newUser: { email: string, password: string, userName: string, firstName?: string, lastName?: string }) {
    const result = await db.insert(users).values(newUser).returning();
    return result[0];
  }

  public async emailAlreadyInUse(email: string) {
    const emailAlreadyInUse = await db.select().from(users).where(eq(users.email, email));

    if (emailAlreadyInUse.length > 0) {
      return true;
    }
    return false;
  }

  public async getUserById(userId: number) {
    const userExists = await db.select().from(users).where(eq(users.id, userId));

    if (userExists.length > 0) {
      return true;
    }
    return false;
  }

  public async userNameTaken(userName: string) {
    const userNameTaken = await db.select().from(users).where(eq(users.userName, userName));

    if (userNameTaken.length > 0) {
      return true;
    }
    return false;
  }

  public async updateUser(user: NewUser) {
    const definedProps = this.filterDefinedProperties(user);
    const updatedUser = await db.update(users).set(definedProps).where(eq(users.id, Number(user.id))).returning();
    return updatedUser[0];
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const foundUser = await db.select().from(users).where(eq(users.email, email));
    if (foundUser.length === 0) {
      return null;
    }
    return foundUser[0];
  }

  public filterDefinedProperties<T extends object>(obj: T): Partial<T> {
    const definedProps: Partial<Record<keyof T, T[keyof T]>> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Use a type assertion here to tell TypeScript that `key` is indeed a key of T
        const typedKey = key as keyof T;
        const value = obj[typedKey];

        if (value !== undefined) {
          // Now TypeScript knows that definedProps has the same keys as T,
          // and the values are of the same type as those in T
          definedProps[typedKey] = value;
        }
      }
    }

    // A type assertion to cast the result back to Partial<T>
    return definedProps as Partial<T>;
  }
}

/**--------------App--------------**/

const userService = new UserService();
const app = express();
app.use(express.json());
app.use(cors());

/**--------------Routes--------------**/

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
    const userNameTaken = await userService.userNameTaken(newUser.userName);
    if (userNameTaken) {
     return res.status(409).json({
        error: 'UsernameAlreadyTaken',
        data: undefined,
        success: false,
      });
    }

    const emailAlreadyInUse = await userService.emailAlreadyInUse(newUser.email);
    if (emailAlreadyInUse) {
      return res.status(409).json({
        error: 'EmailAlreadyInUse',
        data: undefined,
        success: false,
      });
    }

    const user = await userService.createUser(newUser);
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
    const userExists = await userService.getUserById(Number(userId));
    if (!userExists) {
      return res.status(404).json({
        error: 'UserNotFound',
        data: undefined,
        success: false,
      });
    }

    const userNameTaken = await userService.userNameTaken(user.userName);
    if (userNameTaken) {
      return res.status(409).json({
        error: 'UsernameAlreadyTaken',
        data: undefined,
        success: false,
      });
    }

    const emailAlreadyInUse = await userService.emailAlreadyInUse(user.email);
    if (emailAlreadyInUse) {
      return res.status(409).json({
        error: 'EmailAlreadyInUse',
        data: undefined,
        success: false,
      });
    }

    const updatedUser = await userService.updateUser({ id: userId, ...user });

    res.status(201).json({
      error: undefined,
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        userName: updatedUser.userName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
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

app.get('/users', async (req: Request, res: Response) => {
  const email = req.query.email;

  if (!email || !isValidEmail(email.toString())) {
    return res.status(400).json({
      error: 'ValidationError',
      data: undefined,
      success: false,
    });
  }

  try {
    const user = await userService.getUserByEmail(email.toString());
    if (!user) {
      return res.status(404).json({
        error: 'UserNotFound',
        data: undefined,
        success: false,
      });
    } else {
      return res.status(200).json({
        error: undefined,
        data: {
          id: user.id,
          email: user.email,
          userName: user.userName,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
        },
        success: true,
      });
    }
  } catch (error: unknown) {
    return res.status(500).json({
      error: 'ServerError',
      data: undefined,
      success: false,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
