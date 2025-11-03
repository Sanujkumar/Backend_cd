import { Request, Response } from "express";
import prisma from "../db";
import { JwtPayloadWithUser } from "../middleware/auth";


export const redeemCode = async (req: JwtPayloadWithUser, res: Response) => {
  try{
    const { code } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: missing user" });
    }
    const now = new Date();
    const redeemCode = await prisma.redeemCode.findUnique({ where: { code } });

    if (!redeemCode) return res.status(400).json({ message: "Invalid code" });


    if (redeemCode.expiryAt <= now) {

      if (redeemCode.status === "ACTIVE") {
        await prisma.redeemCode.update({
          where: { id: redeemCode.id },
          data: { status: "expired" },   
        });
      }
      return res.status(400).json({ message: "Code expired" });
    }


    if (redeemCode.type === "UNIQUE" && redeemCode.redeemedCount >= 1)
      return res.status(400).json({ message: "Code already redeemed" });

    if (
      redeemCode.type === "COMMON" &&
      redeemCode.redemptionLimit &&
      redeemCode.redeemedCount >= redeemCode.redemptionLimit
    ) {
      await prisma.redeemCode.update({
        where: { id: redeemCode.id },
        data: { status: "expired" },
      });
      return res.status(400).json({ message: "Redemption limit reached" });
    }


    await prisma.$transaction(async (tx) => {
      await tx.redeemCode.update({
        where: { id: redeemCode.id },
        data: {
          redeemedCount: { increment: 1 },
          status:
            redeemCode.redemptionLimit &&
              redeemCode.redeemedCount + 1 >= redeemCode.redemptionLimit
              ? "expired"
              : redeemCode.status,
        },
      });

      await tx.redemption.create({
        data: { codeId: redeemCode.id, userId },
      });
    });

    res.status(201).json({ success: true, message: "Redeemed successfully!" });
  }
catch (err) {
    res.status(500).json({
      success: true,
      error: "internal server err"
    })
  }
};
    