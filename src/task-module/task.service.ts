
import { Injectable } from "@nestjs/common";
import { Task } from "./interface/task";
import { TaskStoreService } from "./task-store.service";


@Injectable()
export class TaskService {
  constructor(private readonly taskStroreSrevice: TaskStoreService) {}

  public async getTasks(): Promise<Task[]> {
    const data = await this.taskStroreSrevice.getTasks();
    return data
  }

  public async getTask(id: string): Promise<Task> {
    const data = await this.taskStroreSrevice.getTask(id);
    console.log(data);
    return data;
  }

  public async postTask(task: Task): Promise<Task[]> {
    return this.taskStroreSrevice.postTask(task);
  }

  public async deleteTask(id: string): Promise<Task[]> {
    return this.taskStroreSrevice.deleteTask(id);
  }

  public async getTasksByFilter(filter: string): Promise<Task[]> {
    return this.taskStroreSrevice.filterTask(filter);
  }
}