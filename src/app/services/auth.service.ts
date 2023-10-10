import {Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {User} from "../classes/user";
import {LaravelErrorResponse} from "../classes/laravel-error-response";
import {httpErrorHandler} from "../utils/http-error-handler";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private user = signal<User | null>(null);


  isLoggedIn() {
    return this.user() !== null;
  }

  async login(email: string, password: string) {
    let data: User | LaravelErrorResponse | undefined;
    try {
      await lastValueFrom(this.http.get(`${environment.apiUrl}/sanctum/csrf-cookie`));
      const response = await lastValueFrom(this.http.post(`${environment.apiUrl}/api/login`, { email, password }));
      data = new User().fromObject(response);
      this.user.set(data)
    } catch (e) {
        data = httpErrorHandler(e);
    }
    return data;
  }

  logout() {
    this.user.set(null);
  }
}
