// ./auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("NextAuth authorize called with:", {
          email: credentials?.email,
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        console.log(
          "User found in database:",
          user
            ? {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              }
            : null
        );

        if (!user) {
          console.log("User not found");
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Password validation result:", isValid);

        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        console.log("Returning user from authorize:", {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        });

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log("=== JWT CALLBACK START ===");
      console.log("JWT callback - user:", JSON.stringify(user, null, 2));
      console.log(
        "JWT callback - token before:",
        JSON.stringify(token, null, 2)
      );

      if (user) {
        console.log("User exists in JWT callback, adding user data to token");
        console.log("User ID:", user.id);
        console.log("User role:", user.role);
        token.id = user.id as string;
        token.role = user.role as string;
        console.log("Token ID set to:", token.id);
        console.log("Token role set to:", token.role);
      } else {
        console.log("No user in JWT callback, using existing token data");
      }

      console.log(
        "JWT callback - token after:",
        JSON.stringify(token, null, 2)
      );
      console.log("=== JWT CALLBACK END ===");
      return token;
    },
    async session({ session, token }) {
      console.log("=== SESSION CALLBACK START ===");
      console.log("Session callback - token:", JSON.stringify(token, null, 2));
      console.log(
        "Session callback - session before:",
        JSON.stringify(session, null, 2)
      );

      if (token) {
        console.log(
          "Token exists in session callback, adding token data to session"
        );
        console.log("Token ID:", token.id);
        console.log("Token role:", token.role);
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        console.log("Session user ID set to:", session.user.id);
        console.log("Session user role set to:", session.user.role);
      } else {
        console.log("No token in session callback");
      }

      console.log(
        "Session callback - session after:",
        JSON.stringify(session, null, 2)
      );
      console.log("=== SESSION CALLBACK END ===");
      return session;
    },
  },
});
