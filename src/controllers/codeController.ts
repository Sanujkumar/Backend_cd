

import { Request, Response } from "express";
import prisma from "../db";
import { generateCode } from "../utils/generateCode";
import { JwtPayloadWithUser } from "../middleware/auth";

export const createCode = async (req: JwtPayloadWithUser, res: Response) => {
  try {
  const { code, type, redemptionLimit, expiryAt } = req.body;
  const adminId = req.user?.id;  

  if (!type || !expiryAt) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newCode = await prisma.redeemCode.create({
    data: {
      code: code || generateCode(),
      type,
      redemptionLimit: type === "COMMON" ? Number(redemptionLimit) : null,
      expiryAt: new Date(expiryAt),
      createdBy: adminId!,
    },
  });

  res.json({ success: true, data: newCode });
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server error" });
}
};


