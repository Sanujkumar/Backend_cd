import express from "express";
import prisma from "./db";  
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import codeRoutes from "./routes/codeRoutes";
import dotenv from "dotenv";   
dotenv.config();
  
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);  
  
app.use("/api/users",userRoutes);
app.use("/api/code",codeRoutes);   


app.get("/",(req,res) => {
    res.send("hi sanuj , welocme back to my home ");  
})

app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});

   