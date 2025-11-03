import { Response } from "express";
import { JwtPayloadWithUser } from "../middleware/auth";
export declare const redeemCode: (req: JwtPayloadWithUser, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=reedemController.d.ts.map