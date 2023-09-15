import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import * as admin from 'firebase-admin';
import { CreateTaskDto } from '../dtos';

@Injectable()
export class TaskService {
  private db = admin.firestore();

  async getAllTasks(): Promise<Task[]> {
    const tasksRef = this.db.collection('tasks');
    const tasksSnapshot = await tasksRef.get();
    const tasks = tasksSnapshot.docs.map((doc) => {
      const data = doc.data();
      const newTask = new Task();

      newTask.id = doc.id;
      newTask.title = data.title;
      newTask.description = data.description;
      newTask.status = data.status;
      newTask.createdAt = data.createdAt;
      newTask.updatedAt = data.updatedAt;

      return newTask;
    });
    return tasks;
  }

  async createTask(taskData: CreateTaskDto): Promise<Task> {
    const tasksRef = this.db.collection('tasks');
    const newTaskData = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    };

    const newTaskRef = await tasksRef.add(newTaskData);
    const newTaskDoc = await newTaskRef.get();
    const data = newTaskDoc.data();

    const newTask = new Task();

    newTask.id = newTaskRef.id;
    newTask.title = data.title;
    newTask.description = data.description;
    newTask.status = data.status;
    newTask.createdAt = data.createdAt;
    newTask.updatedAt = data.updatedAt;

    return newTask;
  }

  async updateTask(id: string, updatedTask: CreateTaskDto): Promise<Task> {
    const taskRef = this.db.collection('tasks').doc(id);
    const updatedTaskDoc = await taskRef.get();
    const data = updatedTaskDoc.data();

    const taskToUpdate = {
      ...updatedTask,
      createdAt: data.createdAt,
      updatedAt: admin.firestore.Timestamp.now(),
    };

    await taskRef.update(taskToUpdate);

    const taskEntity = new Task();

    taskEntity.id = id;
    taskEntity.title = data.title;
    taskEntity.description = data.description;
    taskEntity.status = data.status;

    return taskEntity;
  }
}
