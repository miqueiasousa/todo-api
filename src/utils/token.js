import jwt from "jsonwebtoken";

export function sign(payload) {
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "7d",
  });
}

export function verify(token) {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
}
