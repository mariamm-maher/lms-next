import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface DecodedToken {
  userId: number;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  iat: number;
  exp: number;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
  studentProfile?: {
    id: number;
    userId: number;
    level?: string;
    interests?: string;
    photoUrl?: string;
    bio?: string;
    location?: string;
    phoneNumber?: string;
  };
  teacherProfile?: {
    id: number;
    userId: number;
    bio?: string;
    expertise?: string;
    photoUrl?: string;
    rating?: number;
    totalStudents?: number;
    yearsOfExperience?: number;
    education?: string;
  };
}

/**
 * Extract JWT token from request headers or cookies
 */
export function extractToken(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "");
  }

  // Try cookies as fallback
  const cookieToken = request.cookies.get("auth-token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

/**
 * Verify JWT token and return decoded payload
 */
export function verifyToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Get authenticated user from request
 * Returns user object or null if not authenticated
 */
export async function getAuthenticatedUser(
  request: NextRequest
): Promise<AuthenticatedUser | null> {
  const token = extractToken(request);
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        studentProfile: true,
        teacherProfile: true,
      },
    });

    if (!user) {
      return null;
    } // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as AuthenticatedUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

/**
 * Check if user has required role
 */
export function hasRole(
  user: AuthenticatedUser,
  requiredRole: "STUDENT" | "TEACHER" | "ADMIN"
): boolean {
  return user.role === requiredRole;
}

/**
 * Check if user has any of the required roles
 */
export function hasAnyRole(
  user: AuthenticatedUser,
  requiredRoles: Array<"STUDENT" | "TEACHER" | "ADMIN">
): boolean {
  return requiredRoles.includes(user.role);
}

/**
 * Middleware helper to protect API routes
 * Usage in API route: const user = await requireAuth(request, ["TEACHER"]);
 */
export async function requireAuth(
  request: NextRequest,
  allowedRoles?: Array<"STUDENT" | "TEACHER" | "ADMIN">
): Promise<AuthenticatedUser> {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    throw new Error("Authentication required");
  }

  if (allowedRoles && !hasAnyRole(user, allowedRoles)) {
    throw new Error(
      `Access denied. Required roles: ${allowedRoles.join(", ")}`
    );
  }

  return user;
}

/**
 * Generate a new JWT token for user
 */
export function generateToken(user: {
  id: number;
  email: string;
  role: string;
}): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as DecodedToken;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Refresh token if it's close to expiring
 */
export function shouldRefreshToken(
  token: string,
  refreshThresholdHours: number = 24
): boolean {
  try {
    const decoded = jwt.decode(token) as DecodedToken;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - currentTime;
    const refreshThreshold = refreshThresholdHours * 60 * 60; // Convert hours to seconds

    return timeUntilExpiry < refreshThreshold;
  } catch {
    return true;
  }
}

// Error classes for better error handling
export class AuthenticationError extends Error {
  constructor(message: string = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = "Access denied") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class TokenExpiredError extends Error {
  constructor(message: string = "Token has expired") {
    super(message);
    this.name = "TokenExpiredError";
  }
}
