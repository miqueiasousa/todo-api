import { compare, hash } from "../utils/encrypt.js";
import { sign } from "../utils/token.js";

import { userRepository } from "../repositories/UserRepository.js";

export class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const hashedPassword = await hash(password);
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json(user);
  }

  async authentication(req, res) {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.sendStatus(401);
    }

    const token = sign({ sub: user.id });

    return res.status(200).json({ user, token });
  }
}
