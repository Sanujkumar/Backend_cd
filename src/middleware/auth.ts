import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface CustomRequest extends Request {
  userId?: string;
  email?: string;
  role?: string;
  name?: string;
}

export interface JwtPayloadWithUser extends jwt.JwtPayload {
  user?: {
    id: number;
    email: string;
    role: string;
    name: string;
  };
}   

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined in .env");
}

export  const authorize = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Token is missing" });
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success: false,
            error: "token is missing"
        });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayloadWithUser;

    if (!decoded?.user) {
      return res.status(401).json({ success: false, error: "Invalid token" });
    }

    req.userId = decoded.user.id.toString();
    req.email = decoded.user.email;
    req.role = decoded.user.role;
    req.name = decoded.user.name;

    next();
  } catch (error) {
    console.error("authorize error:", error);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};   
