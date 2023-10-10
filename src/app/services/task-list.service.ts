import {Injectable, signal} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../classes/user";
import {LaravelErrorResponse, LaravelErrorResponseType} from "../classes/laravel-error-response";
import {catchError, lastValueFrom, of} from "rxjs";
import {environment} from "../../environments/environment";
import {httpErrorHandler} from "../utils/http-error-handler";
import {TaskList} from "../classes/task-list";
import {TaskListDetail} from "../classes/task-list-detail";

@Injectable()
export class TaskListService {

  public tasks = signal<TaskList[]>([]);

  constructor(private http: HttpClient) {}


  async getTasks() {
      let data: TaskList[] | LaravelErrorResponse | undefined;
      try {
          const response: any = await lastValueFrom(this.http.get(`${environment.apiUrl}/api/list`));
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
      const response = await lastValueFrom(this.http.get(`${environment.apiUrl}/api/list/${id}`));
      // @ts-ignore
      data = new TaskListDetail().fromObject(response.data);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async updateTask(id: number, detail: TaskListDetail) {
    let data: TaskListDetail | LaravelErrorResponse | undefined;
    try {
      const response = await lastValueFrom(this.http.patch(`${environment.apiUrl}/api/list/${id}`, detail));
      // @ts-ignore
      data = new TaskListDetail().fromObject(response.data);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async createTask(detail: TaskListDetail) {
    let data: TaskListDetail | LaravelErrorResponse | undefined;
    try {
      const response = await lastValueFrom(this.http.post(`${environment.apiUrl}/api/list`, detail));
      // @ts-ignore
      data = new TaskListDetail().fromObject(response.data);
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async deleteTask(id: number) {
    let data: LaravelErrorResponse | undefined;
    try {
      await lastValueFrom(this.http.delete(`${environment.apiUrl}/api/list/${id}`));
      const itemIndex = this.tasks().findIndex(l => l.id === id);
      if (itemIndex > -1)  {
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
      await lastValueFrom(this.http.post(`${environment.apiUrl}/api/list/complete/${id}`, {}));
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }

  async shareWithUser(id: number, email: string) {
    let data: LaravelErrorResponse | undefined;
    try {
      await lastValueFrom(this.http.post(`${environment.apiUrl}/api/list/share/${id}`, {email}));
    } catch (e) {
      data = httpErrorHandler(e);
    }
    return data;
  }
}
