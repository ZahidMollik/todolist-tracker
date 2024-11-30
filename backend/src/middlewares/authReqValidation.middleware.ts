import { Request, Response, NextFunction } from "express";

const authReqValidation = (req: Request, res: Response, next: NextFunction): void => {
  
    const { email,password } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    if (!password) {
      res.status(400).json({ message: "password is required" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
      return;
    }
    next();
};

export default authReqValidation;

