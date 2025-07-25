import { ApiError } from '../utils/ApiError';
import { loginType, signupType } from '../validators/auth.schema';
import { Prisma } from '../utils/Prisma';
import bcrypt from 'bcrypt';
import { ApiResponse } from '../utils/ApiResponse';
import jwt from 'jsonwebtoken';
export class AuthService {
  static JWT_SECRET = process.env.JWT_SECRET!;
  static async register(data: signupType) {
    const existingUser = await Prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ApiError(409, 'Email already exist, Please login');
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const user = await Prisma.user.create({
      data: {
        ...data,
        password: hashPassword,
      },
    });
    if (!user) {
      throw new ApiError(400, 'Something went wrong try again');
    }

    return new ApiResponse(
      201,
      { user: { ...user, password: undefined } },
      'User registered successfully',
    );
  }

  static async login(data: loginType) {
    const user = await Prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new ApiError(404, 'User with email not found');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, this.JWT_SECRET, {
      expiresIn: '7d',
    });

    return new ApiResponse(200, {
      token,
      user: { ...user, password: undefined },
    });
  }
}
