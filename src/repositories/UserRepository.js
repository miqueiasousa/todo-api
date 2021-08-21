import { pool } from "../database/index.js";

class UserRepository {
  async create({ name, email, password }) {
    const result = await pool.query(
      'INSERT INTO "users"("name", "email", "password") VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    const [user] = result.rows;

    return user;
  }

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM "users" WHERE LOWER(email) = LOWER($1) LIMIT 1',
      [email]
    );

    const [user] = result.rows;

    return user;
  }
}

export const userRepository = new UserRepository();
