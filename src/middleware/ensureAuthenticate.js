import { verify } from "../utils/token.js";

export function ensureAuthenticate() {
  return (req, res, next) => {
    const { authorization } = req.headers;

    const [, token] = authorization.split(" ");

    try {
      const payload = verify(token);

      req.userId = payload.sub;

      return next();
    } catch (err) {
      return res.sendStatus(401);
    }
  };
}
