import express from "express";
import dotenv from "dotenv";

import { ensureAuthenticate } from "./middleware/ensureAuthenticate.js";
import { verifyTodo } from "./middleware/verifyTodo.js";
import { UserController } from "./controllers/UserController.js";
import { TodoController } from "./controllers/TodoController.js";

dotenv.config();

const userController = new UserController();
const todoController = new TodoController();

const app = express();
const PORT = 3030;

app.use(express.json());

app.post("/", userController.authentication);
app.post("/users", userController.store);

app.use(ensureAuthenticate());

app.post("/todos", todoController.store);
app.get("/todos", todoController.index);
app.get("/todos/:id", verifyTodo(), todoController.show);
app.put("/todos/:id", verifyTodo(), todoController.update);
app.patch("/todos/:id/done", verifyTodo(), todoController.updateTodoAsDone);
app.delete("/todos/:id", verifyTodo(), todoController.destroy);

app.listen(PORT, () => console.log(`Server is listen on port ${PORT}`));
