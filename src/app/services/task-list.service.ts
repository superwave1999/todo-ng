import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LaravelErrorResponse } from '../classes/laravel-error-response';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { httpErrorHandler } from '../utils/http-error-handler';
import { TaskList } from '../classes/task-list';
import { TaskListDetail } from '../classes/task-list-detail';
import { LaravelSuccessResponse } from '../classes/laravel-success-response';
import { AbstractModel } from '../classes/abstract-model';

@Injectable()
export class TaskListService {
  public tasks = signal<TaskList[]>([]);

  constructor(private http: HttpClient) {}

  async getTasks() {
    let data: TaskList[] | LaravelErrorResponse | undefined;
    try {
      const response = <LaravelSuccessResponse>(
        await lastValueFrom(this.http.get(`${environment.apiUrl}/api/list`))
      );
      data = <TaskList[]>response.data;
      this.tasks.set(data);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async getTaskDetail(id: number) {
    let data: TaskListDetail | LaravelErrorResponse | undefined;
    try {
      const response = <LaravelSuccessResponse>(
        await lastValueFrom(
          this.http.get(`${environment.apiUrl}/api/list/${id}`)
        )
      );
      data = new TaskListDetail().fromObject(response.data as AbstractModel);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async updateTask(id: number, detail: TaskListDetail) {
    let data: TaskListDetail | LaravelErrorResponse | undefined;
    try {
      const response = <LaravelSuccessResponse>(
        await lastValueFrom(
          this.http.patch(`${environment.apiUrl}/api/list/${id}`, detail)
        )
      );
      data = new TaskListDetail().fromObject(response.data as AbstractModel);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async createTask(detail: TaskListDetail) {
    let data: TaskListDetail | LaravelErrorResponse | undefined;
    try {
      const response = <LaravelSuccessResponse>(
        await lastValueFrom(
          this.http.post(`${environment.apiUrl}/api/list`, detail)
        )
      );
      data = new TaskListDetail().fromObject(response.data as AbstractModel);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async deleteTask(id: number) {
    let data: LaravelErrorResponse | undefined;
    try {
      await lastValueFrom(
        this.http.delete(`${environment.apiUrl}/api/list/${id}`)
      );
      const itemIndex = this.tasks().findIndex(l => l.id === id);
      if (itemIndex > -1) {
        this.tasks().splice(itemIndex, 1);
      }
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async setItemsComplete(id: number) {
    let data: LaravelErrorResponse | undefined;
    try {
      await lastValueFrom(
        this.http.post(`${environment.apiUrl}/api/list/complete/${id}`, {})
      );
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async shareWithUser(id: number, email: string) {
    let data: LaravelErrorResponse | undefined;
    try {
      await lastValueFrom(
        this.http.post(`${environment.apiUrl}/api/list/share/${id}`, { email })
      );
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }
}
