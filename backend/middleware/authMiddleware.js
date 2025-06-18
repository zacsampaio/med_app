import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {

  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null

  const cookieToken = req.cookies?.token

  const token = bearer || cookieToken

  if (!token) {
    return res.status(401).json({error: "Access denied. No token."})
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.doctorId = decoded.doctorId;
    return next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}

export default verifyToken;
