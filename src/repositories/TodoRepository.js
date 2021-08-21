import { pool } from "../database/index.js";

class TodoRepository {
  async create({ title, description, userId }) {
    const result = await pool.query(
      'INSERT INTO "todos"("title", "description", "user_id") VALUES ($1, $2, $3) RETURNING *',
      [title, description, userId]
    );

    const [todo] = result.rows;

    return todo;
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM "todos" WHERE "id" = $1 LIMIT 1',
      [id]
    );

    const [todo] = result.rows;

    return todo;
  }

  async findByUserId(id) {
    const result = await pool.query(
      'SELECT * FROM "todos" WHERE "user_id" = $1',
      [id]
    );

    const todos = result.rows;

    return todos;
  }

  async update(id, { title, description }) {
    const result = await pool.query(
      'UPDATE "todos" SET "title" = $1, "description" = $2, "updated_at" = now() WHERE "id" = $3 RETURNING *',
      [title, description, id]
    );

    const [todo] = result.rows;

    return todo;
  }

  async updateIsDone(id) {
    const result = await pool.query(
      'UPDATE "todos" SET "is_done" = true, "updated_at" = now() WHERE "id" = $1 RETURNING *',
      [id]
    );

    const [todo] = result.rows;

    return todo;
  }

  async del(id) {
    const result = await pool.query(
      'DELETE FROM "todos" WHERE "id" = $1 RETURNING *',
      [id]
    );

    const [todo] = result.rows;

    return todo;
  }
}

export const todoRepository = new TodoRepository();
