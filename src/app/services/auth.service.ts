import {Injectable, signal} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {lastValueFrom} from "rxjs";
import {User} from "../classes/user";
import {LaravelErrorResponse, LaravelErrorResponseType} from "../classes/laravel-error-response";

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
        if (e instanceof HttpErrorResponse) {
          if (e.status === 0) {
            data = new LaravelErrorResponse('Connection timeout', LaravelErrorResponseType.ClientError)
          } else if (e.status === 422) {
            data = new LaravelErrorResponse(e.error.message, LaravelErrorResponseType.ValidationError, e.error.errors)
          } else if (e.status === 401) {
            data = new LaravelErrorResponse('Invalid credentials', LaravelErrorResponseType.AuthError)
          } else if (e.status === 500) {
            data = new LaravelErrorResponse('Server could not complete request', LaravelErrorResponseType.ServerError)
          }
        }
        console.error(e);
    }
    return data;
  }

  logout() {
    this.user.set(null);
  }
}
