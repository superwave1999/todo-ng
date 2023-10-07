import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LaravelErrorResponseType} from "../classes/laravel-error-response";
import {User} from "../classes/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loading = false;

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  async submit() {
    this.loading = true;
    const response = await this.authService.login(
      this.form.get('email')?.value || '',
      this.form.get('password')?.value || ''
    );
    if (!response) {
      return;
    }
    if (response instanceof User) {
      await this.router.navigate([''])
      return;
    }
    this.form.get('password')?.setValue('');
    this._snackBar.open(response.message)
    this.loading = false;
  }
}
