import { Response } from "express";
import { JwtPayloadWithUser } from "../middleware/auth";
export declare const createCode: (req: JwtPayloadWithUser, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=codeController.d.ts.map