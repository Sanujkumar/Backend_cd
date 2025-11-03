import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
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
export declare const authorize: (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map