import { Response, NextFunction } from "express";
import { CustomRequest } from "./auth";
export declare const requireRole: (requiredRole: string) => (req: CustomRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=role.d.ts.map