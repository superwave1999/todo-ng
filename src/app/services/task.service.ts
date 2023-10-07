import {Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";


interface Task {
  id: bigint,
  name: string,
  text: string
}

@Injectable()
export class TaskService {

  private tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {}




  getTasks() {
    return this.http.get('', {}).subscribe((tasks) => {
      //this.tasks.update(tasks)
    });
  }

}
