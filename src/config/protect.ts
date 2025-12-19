import jwt from "jsonwebtoken";

export const protect = (req:any, res:any, next:any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
