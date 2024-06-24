import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoService: Repository<Todo>,
    private userService: UserService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.findUserById(userId);
    return this.todoService.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.todoService.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }
  findAllTodoByUserCompleted(userId: number) {
    return this.todoService.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  update(todoId: number) {
    return this.todoService.update(todoId, { completed: true });
  }

  remove(todoId: number) {
    return this.todoService.delete(todoId);
  }
}
