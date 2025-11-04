
import { Response, NextFunction } from "express";
import { CustomRequest } from "./auth";

export const requireRole = (requiredRole: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      console.log("Role from token:", req.role, "Expected:", requiredRole);

      if (!req.role) {
        return res.status(401).json({ success: false, error: "Not authenticated" });
      }
      if (req.role !== requiredRole) {
        return res.status(403).json({ success: false, error: "Forbidden: insufficient permissions" });
      }
      next();
    } catch (err) {
      console.error("requireRole error:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  };
};
