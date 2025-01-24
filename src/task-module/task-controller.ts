import { Body, Controller, Delete, Get, Param, Post, Query, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "./interface/task";


@Controller('task')
export class TaskController {
  constructor(private readonly taskServie: TaskService) {}

  @Get()
  public async getTasks(@Res() res) {
    const data = await this.taskServie.getTasks();
    return res.status(200).send(data);
  }

  @Get('/filter')
  public async getTasksByFilter(@Res() res, @Query() reqParam: { filter: string }) {
    const data = await this.taskServie.getTasksByFilter(reqParam.filter);
    return res.status(200).send(data);
  }

  @Get(':id')
  public async getTask(@Res() res, @Param('id') id: string) {
    const data = await this.taskServie.getTask(id);
    return res.status(200).send(data);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async postTask(@Body() task: Task, @Res() res): Promise<void> {
    const data = await this.taskServie.postTask(task);
    return res.status(201).send(data);
  }

  @Delete(':id')
  public async deleteTask(@Res() res, @Param('id') id: string) {
    const data = await this.taskServie.deleteTask(id);
    return res.status(200).send(data);
  }
}