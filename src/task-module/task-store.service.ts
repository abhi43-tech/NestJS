import { Injectable } from "@nestjs/common";
import { Task } from "./interface/task";


@Injectable()
export class TaskStoreService {
  public tasks: Task[] = [];

  public async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  public async getTask(id: string): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    return Promise.resolve(task);
  }

  public async postTask(task: Task): Promise<Task[]> {
    this.tasks.push(task);
    return Promise.resolve(this.tasks);
  }

  public async deleteTask(id: string): Promise<Task[]> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return Promise.resolve(this.tasks); 
  }

  public async filterTask(filter): Promise<Task[]> {
    if(!filter) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.name === filter);
  }
}