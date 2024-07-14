import { verifyToken } from "../utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token de acesso ausente" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token de acesso ausente" });
  }

  try {
    const decoded = verifyToken(token);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token Inválido" });
  }
};

export default authMiddleware;
