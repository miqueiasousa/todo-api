import { todoRepository } from "../repositories/TodoRepository.js";

export class TodoController {
  async index(req, res) {
    const todos = await todoRepository.findByUserId(req.userId);

    return res.status(200).json(todos);
  }

  async show(req, res) {
    const { id } = req.params;

    const todo = await todoRepository.findById(id);

    return res.status(200).json(todo);
  }

  async store(req, res) {
    const { title, description } = req.body;

    const todo = await todoRepository.create({
      title,
      description,
      userId: req.userId,
    });

    return res.status(201).json(todo);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await todoRepository.update(id, {
      title,
      description,
    });

    return res.status(200).json(updatedTodo);
  }

  async updateTodoAsDone(req, res) {
    const { id } = req.params;

    await todoRepository.updateIsDone(id);

    return res.sendStatus(204);
  }

  async destroy(req, res) {
    const { id } = req.params;

    await todoRepository.del(id);

    return res.sendStatus(204);
  }
}
