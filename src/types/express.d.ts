declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image?: string | null;
        role: "ADMIN" | "USER";
        createdAt: Date;
        updatedAt: Date;
      };
      session?: {
        id: string;
        userId: string;
        expiresAt: Date;
        createdAt?: Date;
        updatedAt?: Date;
      };
    }
  }
}

export {};