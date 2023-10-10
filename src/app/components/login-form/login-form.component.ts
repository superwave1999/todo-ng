import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../classes/user";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
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
