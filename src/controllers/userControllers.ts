import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";


export const registerUsers = async (req: Request, res: Response) => {
  try {
    console.log("hi register api");
    const { name, email, password, role } = req.body;
    console.log(req.body);

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role
      },
    });

    res.status(200).json({
      message: "Registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "please fill all fields"
      });
      return;
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email },
      select: {id:true, name: true, password: true,email: true,role: true }
    });


    if (!isUserExist) {
      res.status(404).json({
        success: true,
        error: "user doesn't exist"
      });
      return;
    }

    if (isUserExist) {
      const isPassword = await bcrypt.compare(password, isUserExist.password);
      if (!isPassword) {
        res.status(401).json({
          success: false,
          message: "password is not correct"
        })
        return;
      }
      isUserExist.password = ""
    }

    const user = {
      name: isUserExist.name,
      password: isUserExist.password,
      email: isUserExist.email,
      role: isUserExist.role,
      id: isUserExist.id
    }


    const token = Jwt.sign({
      user: user
    }, JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "login successfully",
      token,
      user: {
        id: isUserExist.id,
        name: isUserExist.name,
        email: isUserExist.email,
        role: isUserExist.role
      }
    })

  } catch (err) {
    res.status(500).json({
      message: "internal server err"
    });
  }
   
}
