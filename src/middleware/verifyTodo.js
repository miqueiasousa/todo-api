import { todoRepository } from "../repositories/TodoRepository.js";

export function verifyTodo() {
  return async (req, res, next) => {
    const { id } = req.params;

    const todo = await todoRepository.findById(id);

    if (!todo || todo.user_id !== req.userId) {
      return res.sendStatus(404);
    }

    return next();
  };
}
