import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Access Denied! No token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.doctorId = decoded.doctorId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token!" });
  }
}

export default verifyToken;
